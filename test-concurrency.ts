import prisma from './src/lib/prisma';

async function runConcurrencyTest() {
  console.log("Creando producto de prueba...");
  
  const category = await prisma.category.findFirst();
  if (!category) {
    console.log("No category found");
    return;
  }
  
  // 1. Crear producto con stock = 2
  const product = await prisma.product.create({
    data: {
      name: 'Matcha Especial Test',
      slug: `matcha-test-${Date.now()}`,
      price: 10,
      stock: 2,
      shortDescription: 'Test',
      categoryId: category.id,
    }
  });

  console.log("Lanzando transacciones concurrentes simuladas...");

  const tx1 = prisma.$transaction(async (tx) => {
    // Simulando Checkout A: Compra 2 unidades
    const result = await tx.product.updateMany({
      where: { id: product.id, stock: { gte: 2 } },
      data: { stock: { decrement: 2 } }
    });
    if (result.count === 0) throw new Error("A falló por concurrencia");
    
    // Delay artificial para dar ventana a la carrera
    await new Promise(r => setTimeout(r, 1000));
    return "A exito";
  });

  const tx2 = prisma.$transaction(async (tx) => {
    // Esperar a que A empiece pero A bloquea la fila en Postgres
    // Postgres lock row for update
    await new Promise(r => setTimeout(r, 200));
    
    // Simulando Checkout B: Compra 1 unidad
    const result = await tx.product.updateMany({
      where: { id: product.id, stock: { gte: 1 } },
      data: { stock: { decrement: 1 } }
    });
    if (result.count === 0) throw new Error("B falló por concurrencia");
    
    return "B exito";
  });

  try {
    const results = await Promise.allSettled([tx1, tx2]);
    console.log("Resultados de la carrera:");
    results.forEach((res, i) => {
      if (res.status === 'fulfilled') {
        console.log(`Transacción ${i === 0 ? 'A (Pide 2)' : 'B (Pide 1)'}: ÉXITO (${res.value})`);
      } else {
        console.log(`Transacción ${i === 0 ? 'A (Pide 2)' : 'B (Pide 1)'}: RECHAZADA (${res.reason.message})`);
      }
    });

    const finalProduct = await prisma.product.findUnique({ where: { id: product.id } });
    console.log(`\nStock inicial: 2. Stock final esperado: 0. Stock final real: ${finalProduct?.stock}`);

  } catch (error) {
    console.error(error);
  } finally {
    // Cleanup
    await prisma.product.delete({ where: { id: product.id } });
    await prisma.$disconnect();
  }
}

runConcurrencyTest();
