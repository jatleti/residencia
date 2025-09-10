#!/bin/bash

npx prisma format
npx prisma migrate dev
pal schema typescript -o ./libs/shared/util-core/src/lib/entities
