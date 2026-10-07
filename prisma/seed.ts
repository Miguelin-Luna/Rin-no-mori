import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seeder de Rin no mori...');

  // 1. Crear Categorías
  const catTradicionales = await prisma.category.upsert({
    where: { slug: 'tradicionales' },
    update: {},
    create: {
      name: 'Tradicionales',
      slug: 'tradicionales',
      description: 'Galletas clásicas con un toque de inspiración.',
    },
  });

  const catMatcha = await prisma.category.upsert({
    where: { slug: 'matcha' },
    update: {},
    create: {
      name: 'Matcha',
      slug: 'matcha',
      description: 'Nuestra especialidad con auténtico té verde japonés ceremonial.',
    },
  });

  const catChocolate = await prisma.category.upsert({
    where: { slug: 'chocolate' },
    update: {},
    create: {
      name: 'Chocolate',
      slug: 'chocolate',
      description: 'Creaciones con cacao seleccionado y hojicha.',
    },
  });

  const catHojicha = await prisma.category.upsert({
    where: { slug: 'hojicha' },
    update: {},
    create: {
      name: 'Hojicha',
      slug: 'hojicha',
      description: 'Elaboraciones únicas con té verde tostado.',
    },
  });

  const catRegalos = await prisma.category.upsert({
    where: { slug: 'regalos' },
    update: {},
    create: {
      name: 'Regalos',
      slug: 'regalos',
      description: 'Sets y cajas ideales para obsequiar.',
    },
  });

  // 2. Crear Productos
  const galletaMatcha = await prisma.product.upsert({
    where: { slug: 'galleta-matcha' },
    update: {},
    create: {
      name: 'Galleta de Matcha',
      slug: 'galleta-matcha',
      description: 'Galleta artesanal elaborada con auténtico matcha ceremonial de Uji. Suave por dentro, con un toque dulce y terroso.',
      shortDescription: 'Clásica galleta suave con matcha de Uji.',
      price: 3.50,
      stock: 100,
      categoryId: catMatcha.id,
      tags: ['Más vendido', 'Matcha'],
      rating: 4.9,
      reviewCount: 124,
      ingredients: ['Harina de trigo', 'Matcha Uji', 'Mantequilla', 'Azúcar'],
      images: {
        create: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF0vC10y0Tz3iL5s28hJ95nLw9X35oF4_T6k1_oD4Xp5F3_z8_pG5099U1Zl2eH_D4_7_a0VqFqZ-V1E-N2sUf_0rE-Y2aN4tM9X0J8uA4-w3QvF0U2zJ1C_P5f-oQ7oG_k-o7H4gX4_rR8aH9F6Y_4T3c5M3u2pA_qP_Xf_q9L_eJ',
            isMain: true,
          }
        ]
      }
    }
  });

  const hojichaChocolate = await prisma.product.upsert({
    where: { slug: 'hojicha-chocolate' },
    update: {},
    create: {
      name: 'Hojicha & Chocolate',
      slug: 'hojicha-chocolate',
      description: 'Galleta con base de té verde tostado (hojicha) combinada con trozos grandes de chocolate negro al 70%.',
      shortDescription: 'Té tostado japonés y chocolate oscuro.',
      price: 3.75,
      stock: 50,
      categoryId: catHojicha.id,
      tags: ['Nuevo', 'Hojicha'],
      rating: 4.8,
      reviewCount: 45,
      ingredients: ['Harina', 'Hojicha', 'Chocolate oscuro', 'Mantequilla'],
      images: {
        create: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYGE3lBQ_6_tgoeR-0GTtzAL8onkUDw6yWI19a-NnSdouYFJo8FW9oHHqadNlwjg6as4m6Jcp2Dy5vwAWGU-ad5pyHKB1DrEhOiEAnJI4z45AiFSZAoaRjzxbV3_v2qU4nX_S02G_TI-IFQbJtxpyry6fB3MPxD-79eP_E3Kytxn7bxf5VWBXWfUIYAW7CEH48p_q1ucSKd77xp6LOSahD-U35M6MxQJGsDEyNuuZTG5PNb18QMBP0vg',
            isMain: true,
          }
        ]
      }
    }
  });

  const signatureForest = await prisma.product.upsert({
    where: { slug: 'signature-forest-hazelnut' },
    update: {},
    create: {
      name: 'Signature Forest Hazelnut',
      slug: 'signature-forest-hazelnut',
      description: 'Nuestra galleta insignia que recuerda a un bosque. Base rústica con avellanas tostadas, toques de matcha y un ligero espolvoreado de azúcar.',
      shortDescription: 'Galleta de avellana rústica con matcha.',
      price: 4.25,
      stock: 40,
      categoryId: catTradicionales.id,
      tags: ['Insignia', 'Nuts'],
      rating: 5.0,
      reviewCount: 89,
      ingredients: ['Avellanas', 'Matcha', 'Azúcar moreno', 'Harina'],
      images: {
        create: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc8hlF7scGYEtgmnl16klXCE9EeTgPK94k9WpTExwFyINyTB4bM1KRJsrdKo47o18tJ7m_q-YPU8BNklCpwFGepicIhShS8ckY2LKsf0fwj4aKpNTvjBM2-7w4wQCHzmkOgw_-vH5MdWrvWu-qCmVfddBSjhhjlukug8q4W7gHjiYjBsmdVo8qja1TUP0XZMw9a-2yi9lLNUsEtA8_ASFPfnLmIdByaCx6uvAVx2MNjXMcXjDUE9CtBQ',
            isMain: true,
          }
        ]
      }
    }
  });

  const cajaSorpresa = await prisma.product.upsert({
    where: { slug: 'caja-sorpresa-regalo' },
    update: {},
    create: {
      name: 'Caja Sorpresa',
      slug: 'caja-sorpresa-regalo',
      description: 'Una selección secreta de nuestras mejores galletas de la temporada, empacadas en una caja ilustrada perfecta para regalar.',
      shortDescription: '12 galletas seleccionadas por la chef.',
      price: 35.00,
      stock: 20,
      categoryId: catRegalos.id,
      tags: ['Regalo', 'Sorpresa'],
      rating: 4.9,
      reviewCount: 201,
      ingredients: ['Varios'],
      images: {
        create: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtfYyWhcCYUqma8Ww9u-vRR1MKw-Tc123yaAZPF1FRIp_bTCWnIIzRAkqgOsU8NX1DssOBcs4bc6KAijegQU37ISZALKQV1wNGdFN-FUVazfcMLBqjS5xEeGM0L339ESML53I8DHMA7JBwbibDLYvVXi_S2sopxJQTTdiZMIrsZoU-xinhJ8iIDs19MygFDfYf_hBYdruQjjWHxsLSLWOJDRKPHRPgLxBKDSfsnphwfnh-8Q8L7kbyQ',
            isMain: true,
          }
        ]
      }
    }
  });

  console.log('✅ Base de datos poblada con éxito:');
  console.log(`- ${galletaMatcha.name}`);
  console.log(`- ${hojichaChocolate.name}`);
  console.log(`- ${signatureForest.name}`);
  console.log(`- ${cajaSorpresa.name}`);
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando el seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
