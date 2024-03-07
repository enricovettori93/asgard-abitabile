import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const locations = [];
    const width = 200;
    const height = 90;
    const {id} = await prisma.user.create({
        data: {
            name: "Mario",
            surname: "Rossi",
            email: "mario.rossi@interlogica.it",
        }
    });
    for(let i = 0; i < 10; i++) {
        let location = await prisma.location.create({
            data: {
                lat: i,
                lng: i,
                title: `location ${i}`,
                description: `description ${i}`,
                published: false,
                user: {
                    connect: {
                        id
                    }
                },
                pictures: {
                    create: [
                        {
                            alt: "test",
                            height,
                            width,
                            src: `https://placehold.co/${width}x${height}?text=picture-${i}-1`
                        },
                        {
                            alt: "test",
                            height,
                            width,
                            src: `https://placehold.co/${width}x${height}?text=picture-${i}-2`
                        }
                    ]
                }
            }
        });
        locations.push(location);
    }
    console.log("locations seeded", locations)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
