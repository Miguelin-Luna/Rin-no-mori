"use server";

import prisma from "@/lib/prisma";
import { checkAdminAPI } from "@/lib/auth-admin";
import { revalidatePath } from "next/cache";

export async function createProduct(data: any) {
  try {
    await checkAdminAPI();

    const { categoryId, images, ...productData } = data;

    const newProduct = await prisma.product.create({
      data: {
        ...productData,
        categoryId,
        images: images && images.length > 0 ? {
          create: images.map((img: any, index: number) => ({
            url: img.url,
            alt: img.alt || '',
            isMain: index === 0
          }))
        } : undefined
      }
    });

    revalidatePath('/admin/productos');
    revalidatePath('/catalogo');
    
    return { success: true, productId: newProduct.id };
  } catch (error: any) {
    if (error.message === 'Unauthorized') return { error: "Acceso no autorizado." };
    if (error.code === 'P2002') return { error: "El slug ya existe." };
    
    console.error("Error creando producto:", error);
    return { error: "Error interno del servidor." };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    await checkAdminAPI();

    const { categoryId, images, ...productData } = data;

    // Primero actualizamos los datos básicos del producto
    await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        categoryId
      }
    });

    // Luego gestionamos las imágenes. Si envían un array, reemplazamos todas.
    if (images) {
      await prisma.$transaction([
        prisma.productImage.deleteMany({ where: { productId: id } }),
        prisma.productImage.createMany({
          data: images.map((img: any, index: number) => ({
            productId: id,
            url: img.url,
            alt: img.alt || '',
            isMain: index === 0
          }))
        })
      ]);
    }

    revalidatePath('/admin/productos');
    revalidatePath(`/admin/productos/${id}/editar`);
    revalidatePath('/catalogo');
    revalidatePath(`/productos/${data.slug || ''}`);
    
    return { success: true };
  } catch (error: any) {
    if (error.message === 'Unauthorized') return { error: "Acceso no autorizado." };
    if (error.code === 'P2002') return { error: "El slug ya existe." };
    
    console.error("Error actualizando producto:", error);
    return { error: "Error interno del servidor." };
  }
}
