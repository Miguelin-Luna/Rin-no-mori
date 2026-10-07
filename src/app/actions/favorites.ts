"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(productId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autorizado", status: 401 };
    }

    const userId = session.user.id as string;

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        }
      }
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: { id: existingFavorite.id }
      });
      revalidatePath("/favoritos");
      return { success: true, isFavorite: false };
    } else {
      await prisma.favorite.create({
        data: {
          userId,
          productId,
        }
      });
      revalidatePath("/favoritos");
      return { success: true, isFavorite: true };
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { error: "Error interno del servidor", status: 500 };
  }
}
