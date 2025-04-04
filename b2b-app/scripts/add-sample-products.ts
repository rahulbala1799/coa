const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

const sampleProducts = [
  // Paper Bags
  {
    name: "Kraft Paper Flat Handle Bag - Small",
    description: "High-quality kraft paper bags with flat handles. Perfect for takeaway and retail. Size: 22x18x8cm. 90gsm brown kraft paper. Pack of 250.",
    price: 12.99,
    sku: "FHB-S-250",
    category: "PACKAGING",
    inventory: 500
  },
  {
    name: "Kraft Paper Flat Handle Bag - Medium",
    description: "Medium-sized kraft paper bags with flat handles. Ideal for larger takeaway orders. Size: 32x25x11cm. 100gsm brown kraft paper. Pack of 200.",
    price: 15.99,
    sku: "FHB-M-200",
    category: "PACKAGING",
    inventory: 400
  },
  {
    name: "Twisted Handle Paper Bag - Large",
    description: "Premium twisted handle paper bags in white. Perfect for luxury food retail. Size: 40x32x12cm. 120gsm white kraft paper. Pack of 150.",
    price: 18.99,
    sku: "THB-L-150",
    category: "PACKAGING",
    inventory: 300
  },
  {
    name: "SOS Grab Bag - Small",
    description: "Self-standing SOS paper bags. Ideal for takeaway food. Size: 18x12x24cm. 80gsm brown kraft paper. Pack of 500.",
    price: 14.99,
    sku: "SOS-S-500",
    category: "PACKAGING",
    inventory: 1000
  },
  {
    name: "SOS Grab Bag - Large",
    description: "Large self-standing SOS paper bags. Perfect for multiple food items. Size: 26x17x25cm. 90gsm brown kraft paper. Pack of 400.",
    price: 16.99,
    sku: "SOS-L-400",
    category: "PACKAGING",
    inventory: 800
  },
  // Pizza Boxes
  {
    name: "Pizza Box - 7 inch",
    description: "Corrugated pizza boxes for personal size pizzas. E-flute cardboard. Plain brown. Pack of 100.",
    price: 8.99,
    sku: "PB-7-100",
    category: "PACKAGING",
    inventory: 1200
  },
  {
    name: "Pizza Box - 10 inch",
    description: "Standard pizza boxes for medium pizzas. E-flute cardboard with steam vents. Plain brown. Pack of 100.",
    price: 11.99,
    sku: "PB-10-100",
    category: "PACKAGING",
    inventory: 1000
  },
  {
    name: "Pizza Box - 12 inch",
    description: "Large pizza boxes with steam vents. E-flute cardboard. Plain brown. Pack of 100.",
    price: 13.99,
    sku: "PB-12-100",
    category: "PACKAGING",
    inventory: 800
  },
  {
    name: "Premium Pizza Box - 14 inch",
    description: "Premium quality pizza boxes for extra-large pizzas. B-flute cardboard with enhanced ventilation. Custom print available. Pack of 100.",
    price: 16.99,
    sku: "PB-14-100",
    category: "PACKAGING",
    inventory: 600
  },
  // Burger Boxes
  {
    name: "Cardboard Burger Box - Regular",
    description: "Standard burger boxes with secure closure. Size: 10x10x7cm. Food-grade cardboard. Pack of 500.",
    price: 19.99,
    sku: "BB-R-500",
    category: "PACKAGING",
    inventory: 1500
  },
  {
    name: "Cardboard Burger Box - Large",
    description: "Large burger boxes for gourmet burgers. Size: 15x15x8cm. Premium food-grade cardboard. Pack of 400.",
    price: 22.99,
    sku: "BB-L-400",
    category: "PACKAGING",
    inventory: 1200
  },
  {
    name: "Bagasse Burger Box - Regular",
    description: "Eco-friendly bagasse burger boxes. Size: 15x15x8cm. 100% biodegradable and compostable. Pack of 300.",
    price: 24.99,
    sku: "BBB-R-300",
    category: "PACKAGING",
    inventory: 600
  },
  {
    name: "Bagasse Burger Box - Large",
    description: "Large eco-friendly bagasse burger boxes with divider. Size: 20x20x10cm. 100% biodegradable. Pack of 250.",
    price: 27.99,
    sku: "BBB-L-250",
    category: "PACKAGING",
    inventory: 400
  },
  // Specialty Items
  {
    name: "Kraft Food Box with Window",
    description: "Multi-purpose kraft food box with PLA window. Size: 15x12x5cm. Perfect for sandwiches and salads. Pack of 300.",
    price: 21.99,
    sku: "KFB-W-300",
    category: "PACKAGING",
    inventory: 700
  },
  {
    name: "Eco-Friendly Food Container",
    description: "Sustainable food container made from recycled materials. Size: 18x13x6cm. Leak-resistant. Pack of 250.",
    price: 23.99,
    sku: "EFC-250",
    category: "PACKAGING",
    inventory: 500
  }
];

async function main() {
  console.log('Starting to add sample products...');

  for (const product of sampleProducts) {
    try {
      const existingProduct = await db.product.findUnique({
        where: { sku: product.sku },
      });

      if (!existingProduct) {
        await db.product.create({
          data: product,
        });
        console.log(`Added product: ${product.name}`);
      } else {
        console.log(`Product with SKU ${product.sku} already exists, skipping...`);
      }
    } catch (error) {
      console.error(`Error adding product ${product.name}:`, error);
    }
  }

  console.log('Finished adding sample products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  }); 