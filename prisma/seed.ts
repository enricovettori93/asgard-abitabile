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
            password: "test",
            profile: "test"
        }
    });
    for(let i = 0; i < 0; i++) {
        let location = await prisma.location.create({
            data: {
                lat: i,
                lng: i,
                title: `location ${i}`,
                description: `description ${i}`,
                cityName: `city ${i}`,
                published: i % 2 === 0,
                user: {
                    connect: {
                        id
                    }
                },
                maxAdultsForNight: i,
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
    for(let item of ["montagna", "campagna", "mare", "cittá", "spazioso", "monolocale", "luminoso", "arte"]) {
        await prisma.tag.create({
            data: {
                value: item,
            }
        })
    }
    console.log("seed complete", locations)
}
main()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
