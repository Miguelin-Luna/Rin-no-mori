import { Product, CategoryId } from '../types';

export const CATEGORIES: { id: CategoryId; name: string; description: string; image: string }[] = [
  {
    id: 'regalos',
    name: 'Regalos',
    description: 'Cajas de regalo artesanales con surtido prémium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhqH_ewnhzURp6VO3ZUUsTJkmAwsdQBTLPQh7C9zQ2u7EETlIx3siH1FZJrHr3bkWHdgadSTx1fJFjKdWh9OmLpIHlZ4X0apLxQJb6Axf2mNgnIocAmuh0F2Ynj7U60dqgw5-cPCtdMwaEPkkzpFWGQmCT8ebgN7YguD1WGicGh0Z8pjSDfNFsrSY7n864S4zfC8tKiKBh6JjHhnqC2sIl9lpwOcmrHrUmuz6HPbNDGXrOXnD0trJzeg',
  },
  {
    id: 'mini-pasteleria',
    name: 'Mini Pastelería',
    description: 'Bocados delicados para acompañar tu té o café',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB9aZGUioPZoXdLzAFiNl_UJK6wQ6nBSHbxDYcxXkalw9HptCrMnIc6k8hRuzYA-W9yq6wnMXAOVJ3rlLPfF-AbrdZFZ6tiKpT_SPexKeVvNWvtEmSM5R8EeFJsDqnc_EL4i_5cefbFplxw1KIZYfE4eW4QCbSq04_PaedXacFRqa-NLl5BLa0qif_7OYsE9BsWm0rhRiaapOPfb5aNZWXpiviU8DgJ25FWVAg5JRohvIQj2KAQxFFAw',
  },
  {
    id: 'eventos',
    name: 'Paquetes para eventos',
    description: 'Mesas de postres espectaculares y banquetes artesanales',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGruDc43UkiPTMZR_vMt9VxrMS2RCNg7UKWtHzRfSsoZ43DpQKe8mQ7HTkXGj9x1JoC-fSaMg8VoUCjkDyuC3uwu3dqrehdVhfPnTUZh0D1b-N_fLooOvkOwcXL1dr1-MPip6wR-JpFRIOld7IJYuZEX8O_Sm3cIY9Gyy3bjeFc47MarwHTe2x1isdG8HkndH7WezR8qQoAMg3leyObtSV5HsJKtb9KuSBbsRWkPKyYQ9lWz-G02-aTQ',
  },
  {
    id: 'postres',
    name: 'Postres',
    description: 'Pasteles y creaciones de autor horneadas a diario',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYGE3lBQ_6_tgoeR-0GTtzAL8onkUDw6yWI19a-NnSdouYFJo8FW9oHHqadNlwjg6as4m6Jcp2Dy5vwAWGU-ad5pyHKB1DrEhOiEAnJI4z45AiFSZAoaRjzxbV3_v2qU4nX_S02G_TI-IFQbJtxpyry6fB3MPxD-79eP_E3Kytxn7bxf5VWBXWfUIYAW7CEH48p_q1ucSKd77xp6LOSahD-U35M6MxQJGsDEyNuuZTG5PNb18QMBP0vg',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'galleta-matcha',
    name: 'Galleta de Matcha',
    japaneseName: '抹茶クッキー',
    category: 'galletas',
    categoryLabel: 'Galletas',
    price: 7.00,
    shortDescription: 'Sabor intenso, textura suave',
    description: 'Deliciosa galleta artesanal elaborada con matcha Uji ceremonial importado directamente de Kioto y chispas de chocolate blanco de alta pureza. Equilibrada, con notas terrosas profundas y un dulzor sutil.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC020vz1aVGtWEQcWxAVpVjMirCFa_llFSbqMfhdhqNUDLjbypfIDDGIPPZNvrXQCRdqxc5ft5FH0GCLP_Uxn8yxY8LvISgyWlF_MK68RyKIMS4KKGmhkILXuq5ZqvyrUq7adwiW3hl4W5hQHaqqgLREs8HYlWRYd_23t7SVJD2PyAE0x9wBE7OIpJEK8H4Qol9BX_7TxPR8xr2rvo3iNgVx2Fcbe2AMV4x8aicoMkpgD4SXMn3hhWxg',
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCC020vz1aVGtWEQcWxAVpVjMirCFa_llFSbqMfhdhqNUDLjbypfIDDGIPPZNvrXQCRdqxc5ft5FH0GCLP_Uxn8yxY8LvISgyWlF_MK68RyKIMS4KKGmhkILXuq5ZqvyrUq7adwiW3hl4W5hQHaqqgLREs8HYlWRYd_23t7SVJD2PyAE0x9wBE7OIpJEK8H4Qol9BX_7TxPR8xr2rvo3iNgVx2Fcbe2AMV4x8aicoMkpgD4SXMn3hhWxg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtfYyWhcCYUqma8Ww9u-vRR1MKw-Tc123yaAZPF1FRIp_bTCWnIIzRAkqgOsU8NX1DssOBcs4bc6KAijegQU37ISZALKQV1wNGdFN-FUVazfcMLBqjS5xEeGM0L339ESML53I8DHMA7JBwbibDLYvVXi_S2sopxJQTTdiZMIrsZoU-xinhJ8iIDs19MygFDfYf_hBYdruQjjWHxsLSLWOJDRKPHRPgLxBKDSfsnphwfnh-8Q8L7kbyQ'
    ],
    tags: ['Bestseller', 'Organico'],
    rating: 4.9,
    reviewCount: 128,
    inStock: true,
    ingredients: ['Matcha Uji Ceremonial', 'Mantequilla avellanada', 'Chocolate blanco 34%', 'Harina orgánica', 'Sal marina de salina artesanal'],
    flavorNotes: ['Té verde denso', 'Mantequilla cremosa', 'Chocolate blanco fundido']
  },
  {
    id: 'hojicha-choco',
    name: 'Hojicha & Choco',
    japaneseName: 'ほうじ茶チョコ',
    category: 'galletas',
    categoryLabel: 'Galletas',
    price: 4.50,
    shortDescription: 'Té tostado con chocolate oscuro',
    description: 'Infundida con té hojicha tostado a fuego lento, aportando notas ahumadas a frutos secos y caramelo, combinada con trozos rústicos de chocolate oscuro al 70%. Una experiencia reconfortante.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwMEfPH9f27A1TQ7Ltf0_q-5tqTyhbFqWvMn0BxB47_3c34YaXr6Yo-LnzLe1-l5X0sofmmibcbwPAF69TNcse78RICk5kSGzjjxFngWxWSUqNNSsAVrNRREnuS3hL_WIVr5iSk8HS7hxecVUJ7KBQvOBDobPJBNYW835nk66IQH8r5P_sRfVWd3cdThab1o8ZR-UTPPoAASY9N9vl_ZHRESWzIVM7dBawoiWPpJq39qKrVvkLg7wU8g',
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwMEfPH9f27A1TQ7Ltf0_q-5tqTyhbFqWvMn0BxB47_3c34YaXr6Yo-LnzLe1-l5X0sofmmibcbwPAF69TNcse78RICk5kSGzjjxFngWxWSUqNNSsAVrNRREnuS3hL_WIVr5iSk8HS7hxecVUJ7KBQvOBDobPJBNYW835nk66IQH8r5P_sRfVWd3cdThab1o8ZR-UTPPoAASY9N9vl_ZHRESWzIVM7dBawoiWPpJq39qKrVvkLg7wU8g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDc8hlF7scGYEtgmnl16klXCE9EeTgPK94k9WpTExwFyINyTB4bM1KRJsrdKo47o18tJ7m_q-YPU8BNklCpwFGepicIhShS8ckY2LKsf0fwj4aKpNTvjBM2-7w4wQCHzmkOgw_-vH5MdWrvWu-qCmVfddBSjhhjlukug8q4W7gHjiYjBsmdVo8qja1TUP0XZMw9a-2yi9lLNUsEtA8_ASFPfnLmIdByaCx6uvAVx2MNjXMcXjDUE9CtBQ'
    ],
    tags: ['Artesanal', 'Edición Limitada'],
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    ingredients: ['Té Hojicha Tostado', 'Chocolate Amargo 70%', 'Mantequilla fresca', 'Azúcar mascabado sin refinación'],
    flavorNotes: ['Aroma tostado ahumado', 'Cacao profundo', 'Dulzura de nuez']
  },
  {
    id: 'signature-forest-hazelnut',
    name: 'Signature Forest Hazelnut',
    japaneseName: 'ヘーゼルナッツクッキー',
    category: 'galletas',
    categoryLabel: 'Galletas',
    price: 4.50,
    shortDescription: 'Avellanas tostadas, cacao y flor de sal',
    description: 'Nuestra galleta insignia, inspirada en la calidez del bosque. Un equilibrio perfecto de masa dorada con mantequilla tostada, generosos trozos de avellanas locales tostadas y listones de chocolate oscuro de origen ético. Finalizada con un toque sutil de flor de sal artesanal.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuoVw35GfUvKYTHF-Lr5m014w8An_mqmnAMBJT7YuYsZFlsY8jHYveb_IO8idwT0n9IPy-Q1JIyOTC2pI_FAW21g2qHrsB3YgvYK4WivUYH7P29CowPvKNmLzQRSVpmDEL65V1ejcE1itfC2bUZ6EAQ3owLNSeYv5NMDq_X7n84uvSnKiAxIIGVNwTl6FvJhmOHqOquBo3EQEjNrJH3K6Tr77tEtEwvST21mQzIrSSY6Bg9XbQTpywow',
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCuoVw35GfUvKYTHF-Lr5m014w8An_mqmnAMBJT7YuYsZFlsY8jHYveb_IO8idwT0n9IPy-Q1JIyOTC2pI_FAW21g2qHrsB3YgvYK4WivUYH7P29CowPvKNmLzQRSVpmDEL65V1ejcE1itfC2bUZ6EAQ3owLNSeYv5NMDq_X7n84uvSnKiAxIIGVNwTl6FvJhmOHqOquBo3EQEjNrJH3K6Tr77tEtEwvST21mQzIrSSY6Bg9XbQTpywow',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFhR6uru7d8a2KrLJVKM_xMfYRiunfHjwEgVVyk_PWlm8z0eHn8LNikXvFD56QXtht7u8CPZ6tEVOlpgR4WhVTMzQ_46dt9NSlqYEWqDu_3IgaNV1PlnRiz8vafHMzLC4uRJoY1tjxqV1UEbW9_iSaG0HzT5r2n_8s-CdVsQt7oRgu5yXQ3LrQ2-fLKon3pMJ4AisHcJDn10XFIkIBP98HmB75NduM2AnKvlhQi3mN6pa-uzg5IwlRAw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdjX8EK76vcU21XAmzItjcSX1M3A9VHb6GE-PB_iwfq7FfqnTvrx4lWvsshrgtM6_MQmo9wDd8rjO6D2_yVduWLcoK1KN38rRqAIekWD7FguTbcP3w_SZcLZQxsd1QYUMAs5ywXJkVT79GnLDS-b0UFTxGVtT7sZsaMzeghh9vUrATGY1nS98ppq4ahiJpGK9RbbZhk4GmojxYx_9HZnoX6U_su6GWts1pI0Cb3F6xvE88M02U4pYCDg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3XniK6aW0gC_KvvyKOdemtWAzfrLlsYZIpltWnoi8nIxSezEWMA8f41JLoWxn1YeOPnDFjblAqJaazR7wJLt0Q6oZ6CnpU64yC_8fSvKf04kJ6omjiJ6r7QZwBsROVzgePaFzVGJOVGiWBlJB9jH97ZW9IbspZpy5NFQeKBIMLwk-IpHFkuPB0qO-ME5FF1PPrK1oyKFe71C4OO6tU3A2mk9jUIEVIUucWaAlhLFJXkekQbrR04kNSg'
    ],
    tags: ['Bestseller', 'Contains Nuts'],
    rating: 5.0,
    reviewCount: 215,
    inStock: true,
    ingredients: ['Avellanas tostadas crujientes', 'Chocolate bitter 65%', 'Mantequilla dorada', 'Flor de sal marina'],
    flavorNotes: ['Avellana tostada', 'Mantequilla noisette', 'Chocolate terroso con sal']
  },
  {
    id: 'caja-regalo-artesanal',
    name: 'Caja de Regalo Rin no mori',
    japaneseName: 'ギフトボックス',
    category: 'regalos',
    categoryLabel: 'Regalos',
    price: 24.00,
    shortDescription: 'Surtido de 12 galletas y trufas en empaque especial',
    description: 'Elegante caja de presentación con grabado tradicional en madera balsa. Contiene 12 piezas surtidas seleccionadas por nuestros maestros reposteros: galletas de matcha, hojicha, avellana y trufas cubiertas de cacao puro.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhqH_ewnhzURp6VO3ZUUsTJkmAwsdQBTLPQh7C9zQ2u7EETlIx3siH1FZJrHr3bkWHdgadSTx1fJFjKdWh9OmLpIHlZ4X0apLxQJb6Axf2mNgnIocAmuh0F2Ynj7U60dqgw5-cPCtdMwaEPkkzpFWGQmCT8ebgN7YguD1WGicGh0Z8pjSDfNFsrSY7n864S4zfC8tKiKBh6JjHhnqC2sIl9lpwOcmrHrUmuz6HPbNDGXrOXnD0trJzeg',
    tags: ['Especial Regalo', 'Empaque Prémio'],
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    ingredients: ['Selección surtida de galletas y bombones'],
    flavorNotes: ['Variedad de tés japoneses', 'Cacao fino', 'Texturas crujientes']
  },
  {
    id: 'mini-pasteleria-surtida',
    name: 'Bandeja Mini Pastelería',
    japaneseName: 'ミニ洋菓子セット',
    category: 'mini-pasteleria',
    categoryLabel: 'Mini Pastelería',
    price: 18.50,
    shortDescription: 'Selección de 16 minipasteles para reuniones',
    description: 'Una selección de minipasteles hechos a mano, eclairs miniaturizados, tartas de frutas de temporada y galletas de nieve. Perfectos para acompañar ceremonias de té o celebraciones amables.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB9aZGUioPZoXdLzAFiNl_UJK6wQ6nBSHbxDYcxXkalw9HptCrMnIc6k8hRuzYA-W9yq6wnMXAOVJ3rlLPfF-AbrdZFZ6tiKpT_SPexKeVvNWvtEmSM5R8EeFJsDqnc_EL4i_5cefbFplxw1KIZYfE4eW4QCbSq04_PaedXacFRqa-NLl5BLa0qif_7OYsE9BsWm0rhRiaapOPfb5aNZWXpiviU8DgJ25FWVAg5JRohvIQj2KAQxFFAw',
    tags: ['Ideal para compartir', 'Para Té'],
    rating: 4.8,
    reviewCount: 62,
    inStock: true
  },
  {
    id: 'bombones-artesanales',
    name: 'Bombones Artesanales Rellenos',
    japaneseName: '和風ボンボンショコラ',
    category: 'bombones',
    categoryLabel: 'Bombones',
    price: 15.00,
    shortDescription: 'Rellenos de yuzu, sésamo negro y matcha',
    description: 'Nuestra especialidad de la casa. Colección de bombones pintados a mano con ganache de yuzu silvestre, sésamo negro tostado y praliné de almendras y tés orientales.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1XmQgvG7ZI9JMWHE_WfwEue0gU_328wAE1AwCwd3rdV2hp2D04AvvbcruiQtMmT6i1DiTVzNITUDG7L0QYK0wS_k6RlAkJ6NUfa1qR-SKwVxSqCeazbaeA-Y1caoFPW-jI3QzFyzELT8Z-BEVNJ06GsnaG9_ssNnyLyRC3F_t6GEAggfGmwdDjY_svBZBgjj2hw0w-YEFfPNnQ_HZ3wtlNY1zSzFfhyfrulD8j-tnN5lgPHZqMOQgmyMeLCowyAtSDTM',
    tags: ['Especialidad de la Casa', 'Edición Limitada'],
    rating: 5.0,
    reviewCount: 142,
    inStock: true
  },
  {
    id: 'pastel-coco-citrico',
    name: 'Pastel de Coco y Cítricos Silvestres',
    japaneseName: '柑橘とココナッツのケーキ',
    category: 'postres',
    categoryLabel: 'Postres',
    price: 28.00,
    shortDescription: 'Bizcocho ligero con coco tostado y yuzu',
    description: 'Suave bizcocho de vainilla y cardamomo cubierto con crema ligera de coco horneada, hojuelas de coco ligeramente doradas y rodajas de fruta de temporada deshidratada.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYGE3lBQ_6_tgoeR-0GTtzAL8onkUDw6yWI19a-NnSdouYFJo8FW9oHHqadNlwjg6as4m6Jcp2Dy5vwAWGU-ad5pyHKB1DrEhOiEAnJI4z45AiFSZAoaRjzxbV3_v2qU4nX_S02G_TI-IFQbJtxpyry6fB3MPxD-79eP_E3Kytxn7bxf5VWBXWfUIYAW7CEH48p_q1ucSKd77xp6LOSahD-U35M6MxQJGsDEyNuuZTG5PNb18QMBP0vg',
    tags: ['Fresco', 'Postre Insignia'],
    rating: 4.9,
    reviewCount: 77,
    inStock: true
  }
];

export const INITIAL_CART: { product: Product; quantity: number }[] = [
  {
    product: PRODUCTS[0], // Galleta de Matcha ($7.00)
    quantity: 2
  },
  {
    product: PRODUCTS[1], // Hojicha & Choco ($4.50)
    quantity: 1
  }
];

export const MASCOT_STICKER = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjXCdJjzmSNhR3SVfKl2RL4D2_7TJFPYhIYTfGEW8J55FRlEFcUNDDjYthgJzJpMQN3_N7W74WhTvZc7CQ6_BU1AFTQvd8XhVdDQP4RfnFWygw6d3Y0ObHKjUZ3bZoZwROO3sI1BRRtS8TjmD7gJc0sMVLLAUylHY9k2NsMtyPQdaNiFqhh9ySTTHkaM9XfAyT2lBdYwfWYGLXPykojCuqTV9zLSPfEfk3BO2GD6x7E8orzbC8cDzKrpo_fY2Hz6MfNq4';

export const LOGO_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCSsA_lATnE90RoDqagYqVmyxG_hQHFkpv3aypA_k0PZOYBxr9BlMXqTIDTWhBoKAwK5k2N_8RkG7oDxIVJrsy0OX_Z7Wy5UQl0D-ZsOQRsVZ-TqdCgUn6BpvilUptEN8zfbSzt82XhK3N2fCEoGVbuJKgovTQyFA4SfYMUpIq6zGl7Fc2POF5ZfQk5-jmlsT-q26dQjJsP5Bpv2n3pbqVmVTqOLgN5oZ8rBfrHVd-55Deb_2Ap56aWQ';
