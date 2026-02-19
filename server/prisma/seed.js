import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Nova X1 5G",
    slug: "nova-x1-5g",
    description: "6.6-inch AMOLED, 120Hz, 50MP triple camera, 5000mAh battery.",
    mrp: new Prisma.Decimal(44999),
    price: new Prisma.Decimal(38999),
    imageUrl: "/images/1.jpg",
    variants: [
      { storage: "128GB", color: "Midnight Black" },
      { storage: "256GB", color: "Arctic Blue" }
    ],
    emiPlans: [
      {
        monthlyAmount: new Prisma.Decimal(10833),
        tenureMonths: 3,
        interestRate: 0,
        cashback: new Prisma.Decimal(500)
      },
      {
        monthlyAmount: new Prisma.Decimal(5625),
        tenureMonths: 6,
        interestRate: 0,
        cashback: new Prisma.Decimal(750)
      },
      {
        monthlyAmount: new Prisma.Decimal(3575),
        tenureMonths: 12,
        interestRate: 10.5,
        cashback: new Prisma.Decimal(1000)
      },
      {
        monthlyAmount: new Prisma.Decimal(2550),
        tenureMonths: 18,
        interestRate: 10.5,
        cashback: new Prisma.Decimal(1500)
      }
    ]
  },
  {
    name: "Zenith Pro Max",
    slug: "zenith-pro-max",
    description: "6.8-inch OLED, 200MP camera, Snapdragon 8 Gen, 1TB storage option.",
    mrp: new Prisma.Decimal(89999),
    price: new Prisma.Decimal(79999),
    imageUrl: "/images/1.webp",
    variants: [
      { storage: "256GB", color: "Graphite" },
      { storage: "512GB", color: "Sierra Gold" }
    ],
    emiPlans: [
      {
        monthlyAmount: new Prisma.Decimal(26666),
        tenureMonths: 3,
        interestRate: 0,
        cashback: new Prisma.Decimal(1000)
      },
      {
        monthlyAmount: new Prisma.Decimal(14000),
        tenureMonths: 6,
        interestRate: 0,
        cashback: new Prisma.Decimal(1500)
      },
      {
        monthlyAmount: new Prisma.Decimal(8400),
        tenureMonths: 12,
        interestRate: 10.5,
        cashback: new Prisma.Decimal(2000)
      },
      {
        monthlyAmount: new Prisma.Decimal(6100),
        tenureMonths: 18,
        interestRate: 10.5,
        cashback: new Prisma.Decimal(2500)
      },
      {
        monthlyAmount: new Prisma.Decimal(5200),
        tenureMonths: 24,
        interestRate: 10.5,
        cashback: new Prisma.Decimal(3000)
      }
    ]
  },
  {
    name: "Orbit Lite",
    slug: "orbit-lite",
    description: "6.4-inch LCD, 90Hz, 48MP camera, 4500mAh battery.",
    mrp: new Prisma.Decimal(24999),
    price: new Prisma.Decimal(21999),
    imageUrl: "/images/2.jpg",
    variants: [
      { storage: "64GB", color: "Mint Green" },
      { storage: "128GB", color: "Charcoal" }
    ],
    emiPlans: [
      {
        monthlyAmount: new Prisma.Decimal(7333),
        tenureMonths: 3,
        interestRate: 0,
        cashback: new Prisma.Decimal(300)
      },
      {
        monthlyAmount: new Prisma.Decimal(3750),
        tenureMonths: 6,
        interestRate: 0,
        cashback: new Prisma.Decimal(500)
      },
      {
        monthlyAmount: new Prisma.Decimal(2100),
        tenureMonths: 12,
        interestRate: 10.5,
        cashback: new Prisma.Decimal(700)
      },
      {
        monthlyAmount: new Prisma.Decimal(1550),
        tenureMonths: 18,
        interestRate: 10.5,
        cashback: new Prisma.Decimal(900)
      }
    ]
  }
];

async function main() {
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        mrp: product.mrp,
        price: product.price,
        imageUrl: product.imageUrl,
        variants: {
          create: product.variants
        },
        emiPlans: {
          create: product.emiPlans
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
