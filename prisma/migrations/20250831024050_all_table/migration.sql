-- CreateEnum
CREATE TYPE "public"."LeadStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'FOLLOW_UP', 'CONVERTED', 'LOST');

-- CreateEnum
CREATE TYPE "public"."CompanyBranch" AS ENUM ('PATAN', 'BAUDHA');

-- CreateEnum
CREATE TYPE "public"."LeadSource" AS ENUM ('REFERRAL', 'WALK_IN', 'ONLINE', 'ADVERTISEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."FollowUpStatus" AS ENUM ('PENDING', 'DONE', 'MISSED');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Lead" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "studentName" TEXT,
    "parentName" TEXT,
    "email" TEXT,
    "age" INTEGER,
    "grade" TEXT,
    "gender" "public"."Gender",
    "schoolName" TEXT,
    "address" TEXT,
    "status" "public"."LeadStatus" NOT NULL DEFAULT 'NEW',
    "source" "public"."LeadSource",
    "branch" "public"."CompanyBranch",
    "userId" TEXT NOT NULL,
    "programIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FollowUp" (
    "id" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "priority" "public"."Priority" NOT NULL,
    "remark" TEXT,
    "status" "public"."FollowUpStatus" NOT NULL DEFAULT 'PENDING',
    "leadId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "age" INTEGER,
    "grade" TEXT,
    "gender" "public"."Gender",
    "schoolName" TEXT,
    "address" TEXT,
    "enrolledDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branch" "public"."CompanyBranch" NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_number_key" ON "public"."Lead"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Student_leadId_key" ON "public"."Student"("leadId");

-- AddForeignKey
ALTER TABLE "public"."Lead" ADD CONSTRAINT "Lead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FollowUp" ADD CONSTRAINT "FollowUp_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FollowUp" ADD CONSTRAINT "FollowUp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
