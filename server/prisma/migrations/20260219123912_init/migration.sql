-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mrp" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmiPlan" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "monthlyAmount" DECIMAL(65,30) NOT NULL,
    "tenureMonths" INTEGER NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "cashback" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "EmiPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmiPlan" ADD CONSTRAINT "EmiPlan_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
