'use strict'
const db = require('../server/db')
const User = require('../server/db/models/user')
const Book = require('../server/db/models/book')
const Author = require('../server/db/models/author')
const Review = require('../server/db/models/review')
const SalesOrder = require('../server/db/models/sale')
const OrderItem = require('../server/db/models/orderItem')

const seed = async () => {
  await db.sync({force: true})

  const books = [
    {
      title: 'Harry Potter and the Goblet of Fire',
      price: 19.99,
      genre: 'Young Adult Novel',
      description:
        "The Triwizard Tournament is to be held at Hogwarts. Only wizards who are over seventeen are allowed to enter - but that doesn't stop Harry dreaming that he will win the competition. Then at Halloween, when the Goblet of Fire makes its selection, Harry is amazed to find his name is one of those that the magical cup picks out. He will face death-defying tasks, dragons, and dark wizards, but with the help of his best friends, Ron and Hermione, he might just make it through - alive! ",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/41QJuh3D23L.jpg',
      authorId: 1
    },
    {
      title: "The Handmaid's Tale",
      price: 14.95,
      genre: 'Fiction',
      description:
        "The Handmaid's Tale is a novel of such power that the reader will be unable to forget its images and its forecast. Set in the near future, it describes life in what was once the United States and is now called the Republic of Gilead, a monotheocracy that has reacted to social unrest and a sharply declining birthrate by reverting to, and going beyond, the repressive intolerance of the original Puritans. The regime takes the Book of Genesis absolutely at its word, with bizarre consequences for the women and men in its population.The story is told through the eyes of Offred, one of the unfortunate Handmaids under the new social order. In condensed but eloquent prose, by turns cool-eyed, tender, despairing, passionate, and wry, she reveals to us the dark corners behind the establishment’s calm facade, as certain tendencies now in existence are carried to their logical conclusions. The Handmaid's Tale is funny, unexpected, horrifying, and altogether convincing. It is at once scathing satire, dire warning, and a tour de force. It is Margaret Atwood at her best.",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/41jyiUgqHWL.jpg',
      authorId: 2
    },
    {
      title: 'The DaVinci Code',
      price: 13.95,
      genre: 'Thrillers & Suspense',
      description:
        "As millions of readers around the globe have already discovered, The Da Vinci Code is a reading experience unlike any other. Simultaneously lightning-paced, intelligent, and intricately layered with remarkable research and detail, Dan Brown's novel is a thrilling masterpiece—from its opening pages to its stunning conclusion.",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51hYdKyWYqL.jpg',
      authorId: 3
    },
    {
      title: 'A Game of Thrones: A Song of Ice and Fire',
      price: 19.95,
      genre: 'Fiction',
      description:
        'From a master of contemporary fantasy comes the first novel of a landmark series unlike any you’ve ever read before. With A Game of Thrones, George R. R. Martin has launched a genuine masterpiece, bringing together the best the genre has to offer. Mystery, intrigue, romance, and adventure fill the pages of this magnificent saga, the first volume in an epic series sure to delight fantasy fans everywhere.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/518dkA0JEpL.jpg',
      authorId: 4
    },
    {
      title: 'Sharp Objects',
      price: 19.95,
      genre: 'Thrillers & Suspense',
      description:
        "Fresh from a brief stay at a psych hospital, reporter Camille Preaker faces a troubling assignment: she must return to her tiny hometown to cover the murders of two preteen girls. For years, Camille has hardly spoken to her neurotic, hypochondriac mother or to the half-sister she barely knows: a beautiful thirteen-year-old with an eerie grip on the town. Now, installed in her old bedroom in her family's Victorian mansion, Camille finds herself identifying with the young victims—a bit too strongly. Dogged by her own demons, she must unravel the psychological puzzle of her own past if she wants to get the story—and survive this homecoming.",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51vrmMF6K7L.jpg',
      authorId: 5
    },
    {
      title: 'A Case of Need',
      price: 24.95,
      genre: 'Thrillers & Suspense',
      description:
        'In the tightly knit world of Boston medicine, the Randall family reigns supreme. When heart surgeon J. D. Randall’s teenage daughter dies during a botched abortion, the medical community threatens to explode. Was it malpractice? A violation of the Hippocratic Oath? Or was Karen Randall murdered in cold blood?The natural suspect is Arthur Lee, a brilliant surgeon and known abortionist, who has been carrying out the illegal procedure with the help of pathologist John Berry. After Karen dies, Lee is thrown in jail on a murder charge, and only Berry can prove his friend wasn’t the one who wielded the scalpel. Behind this gruesome death, Berry will uncover a secret that would shock even the most hardened pathologist. An Edgar Award–winning novel by the author of such blockbusters as The Andromeda Strain and Jurassic Park—and creator of the long-running NBC drama ER—A Case of Need is a “superb” medical-thriller mystery (Los Angeles Times).',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51MCT9rFURL.jpg',
      authorId: 6
    },
    {
      title: 'Something in the Water',
      price: 14.95,
      genre: 'Thrillers & Suspense',
      description:
        'Erin is a documentary filmmaker on the brink of a professional breakthrough, Mark a handsome investment banker with big plans. Passionately in love, they embark on a dream honeymoon to the tropical island of Bora Bora, where they enjoy the sun, the sand, and each other. Then, while scuba diving in the crystal blue sea, they find something in the water. . . .',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51GyaUIKFOL.jpg',
      authorId: 7
    },
    {
      title: 'Lord of the Rings',
      price: 14.95,
      genre: 'Fiction',
      description:
        'The Lord of the Rings tells of the great quest undertaken by Frodo and the Fellowship of the Ring: Gandalf the Wizard; the hobbits Merry, Pippin, and Sam; Gimli the Dwarf; Legolas the Elf; Boromir of Gondor; and a tall, mysterious stranger called Strider.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51eq24cRtRL._SX331_BO1,204,203,200_.jpg',
      authorId: 8
    },
    {
      title: 'China Rich Girlfriend',
      price: 14.95,
      genre: 'Fiction',
      description:
        'It’s the eve of Rachel Chu’s wedding, and she should be over the moon. She has a flawless Asscher-cut diamond, a wedding dress she loves, and a fiancé willing to thwart his meddling relatives and give up one of the biggest fortunes in Asia in order to marry her. Still, Rachel mourns the fact that her birthfather, a man she never knew, won’t be there to walk her down the aisle. Then a chance accident reveals his identity. Suddenly, Rachel is drawn into a dizzying world of Shanghai splendor, a world where people attend church in a penthouse, where exotic cars race down the boulevard, and where people aren’t just crazy rich … they’re China rich.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/41xsiJ8NmdL.jpg',
      authorId: 9
    },
    {
      title: 'The Fault in Our Stars',
      price: 14.95,
      genre: 'Young Adult Novel',
      description:
        "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning-author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love.",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51zMqctJBEL._SX312_BO1,204,203,200_.jpg',
      authorId: 10
    },
    {
      title: 'Harry Potter and the Prisoner of Azkaban',
      price: 12.77,
      genre: 'Young Adult Novel',
      description:
        "When the Knight Bus crashes through the darkness and screeches to a halt in front of him, it's the start of another far from ordinary year at Hogwarts for Harry Potter. Sirius Black, escaped mass-murderer and follower of Lord Voldemort, is on the run - and they say he is coming after Harry. In his first ever Divination class, Professor Trelawney sees an omen of death in Harry's tea leaves... But perhaps most terrifying of all are the Dementors patrolling the school grounds, with their soul-sucking kiss...",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51NuYi4-XoL.jpg',
      authorId: 1
    },
    {
      title: 'The Blind Assasin',
      price: 10.1,
      genre: 'Fiction',
      description:
        'In The Blind Assassin, Margaret Atwood weaves together strands of gothic suspense, romance, and science fiction into one utterly spellbinding narrative. The novel begins with the mysterious death—a possible suicide—of a young woman named Laura Chase in 1945. Decades later, Laura’s sister Iris recounts her memories of their childhood, and of the dramatic deaths that have punctuated their wealthy, eccentric family’s history. Intertwined with Iris’s account are chapters from the scandalous novel that made Laura famous, in which two illicit lovers amuse each other by spinning a tale of a blind killer on a distant planet. These richly layered stories-within-stories gradually illuminate the secrets that have long haunted the Chase family, coming together in a brilliant and astonishing final twist.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51ZB1cOs9PL.jpg',
      authorId: 2
    },
    {
      title: 'Astrophysics for People in a Hurry ',
      price: 13.26,
      genre: 'Non-fiction',
      description:
        'What is the nature of space and time? How do we fit within the universe? How does the universe fit within us? There’s no better guide through these mind-expanding questions than acclaimed astrophysicist and best-selling author Neil deGrasse Tyson. But today, few of us have time to contemplate the cosmos. So Tyson brings the universe down to Earth succinctly and clearly, with sparkling wit, in tasty chapters consumable anytime and anywhere in your busy day.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51CeYGN%2Bc0L._SX306_BO1,204,203,200_.jpg',
      authorId: 11
    },
    {
      title: 'IT',
      price: 18.65,
      genre: 'Horror',
      description:
        "Welcome to Derry, Maine. It's a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real. They were seven teenagers when they first stumbled upon the horror. Now they are grown-up men and women who have gone out into the big world to gain success and happiness. But the promise they made 28 years ago calls them to reunite in the same place where, as teenagers, they battled an evil creature that preyed on the city's children. Now children are being murdered again, and their repressed memories of that terrifying summer return as they prepare to once again battle the monster lurking in Derry's sewers.",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/418XRMEX2UL._SX320_BO1,204,203,200_.jpg',
      authorId: 12
    },
    {
      title: 'Pet Sematary',
      price: 18.65,
      genre: 'Horror',
      description:
        "Welcome to Derry, Maine. It's a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real. They were seven teenagers when they first stumbled upon the horror. Now they are grown-up men and women who have gone out into the big world to gain success and happiness. But the promise they made 28 years ago calls them to reunite in the same place where, as teenagers, they battled an evil creature that preyed on the city's children. Now children are being murdered again, and their repressed memories of that terrifying summer return as they prepare to once again battle the monster lurking in Derry's sewers.",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51vN64ub8-L._SX326_BO1,204,203,200_.jpg',
      authorId: 12
    },
    {
      title: 'Aware: The Science and Practice of Presence',
      price: 19.04,
      genre: 'Non-fiction',
      description:
        'An in-depth look at the science that underlies meditation\'s effectiveness, this book teaches readers how to harness the power of the principle "Where attention goes, neural firing flows, and neural connection grows." Siegel reveals how developing a Wheel of Awareness practice to focus attention, open awareness, and cultivate kind intention can literally help you grow a healthier brain and reduce fear, anxiety, and stress in your life. ',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/41%2BwB07rAyL._SX327_BO1,204,203,200_.jpg',
      authorId: 13
    },
    {
      title: 'Gone Girl',
      price: 13.79,
      genre: 'Thrillers & Suspense',
      description:
        'Marriage can be a real killer. One of the most critically acclaimed suspense writers of our time, New York Times best seller Gillian Flynn, takes that statement to its darkest place in this unpausable masterpiece about a marriage gone terribly, terribly wrong. The Chicago Tribune proclaimed that her work "draws you in and keeps you reading with the force of a pure but nasty addiction." Gone Girl\'s toxic mix of sharp-edged wit and deliciously chilling prose creates a nerve-fraying thriller that confounds you at every turn.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/41etyGVwOwL._SX326_BO1,204,203,200_.jpg',
      authorId: 5
    },
    {
      title: 'The Haunted Mask',
      price: 16.92,
      genre: 'Horror',
      description:
        "Carly Beth thinks she's found the best Halloween mask ever. With yellow-green skin and long animal fangs, the mask terrifies the entire neighborhood. Before long, it has a surprising effect on Carly Beth, too. She tries to take it off . . . but it won't budge!Halloween is almost over, but fright night is just beginning.",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51OdpP6e0TL.jpg',
      authorId: 14
    },
    {
      title: "Her Mother's Grave",
      price: 10.99,
      genre: 'Thrillers & Suspense',
      description:
        'When two young boys discover human bones buried beneath a tree in a trailer park, Detective Josie Quinn races to join her team at the scene. She used to play in those woods as a child, happier outside and away from her abusive mother, Belinda Rose. Josie’s past crashes into her present when a rare dental condition confirms the bones belong to a teenage foster-child who was murdered thirty years ago. A girl named Belinda Rose...',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51O5AldHNWL.jpg',
      authorId: 14
    },
    {
      title: 'Jurassic Park',
      price: 19.11,
      genre: 'Thrillers & Suspense',
      description:
        'An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankind’s most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them—for a price.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51Sh8gB0bfL._SY346_.jpg',
      authorId: 6
    }
  ]

  const authors = [
    {
      firstName: 'J.K.',
      lastName: 'Rowling',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/220px-J._K._Rowling_2010.jpg',
      bio:
        'Writing under the pen names J. K. Rowling and Robert Galbraith, is a British novelist, philanthropist, film and television producer and screenwriter best known for writing the Harry Potter fantasy series. The books have won multiple awards, and sold more than 500 million copies,[2] becoming the best-selling book series in history.[3] They have also been the basis for a film series, over which Rowling had overall approval on the scripts[4] and was a producer on the final films in the series.'
    },
    {
      firstName: 'Margaret',
      lastName: 'Atwood',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Margaret_Atwood_2015.jpg/220px-Margaret_Atwood_2015.jpg',
      bio:
        "Margaret Atwood is a Canadian poet, novelist, literary critic, essayist, inventor, teacher and environmental activist. She has published seventeen books of poetry, sixteen novels, ten books of non-fiction, eight collections of short fiction, eight children's books, and one graphic novel, as well as a number of small press editions in poetry and fiction. Atwood and her writing have won numerous awards and honors including the Man Booker Prize, Arthur C. Clarke Award, Governor General's Award, and the National Book Critics and PEN Center USA Lifetime Achievement Awards. Atwood is also the inventor and developer of the LongPen and associated technologies that facilitate the remote robotic writing of documents."
    },
    {
      firstName: 'Dan',
      lastName: 'Brown',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Dan_Brown_November_2015.jpg/220px-Dan_Brown_November_2015.jpg',
      bio:
        'Dan Brown is an American author of thriller novels, most notably the Robert Langdon stories: Angels & Demons (2000), The Da Vinci Code (2003), The Lost Symbol (2009), Inferno (2013) and Origin (2017). His novels are treasure hunts set in a 24-hour period,[2] and feature the recurring themes of cryptography, keys, symbols, codes, art, and conspiracy theories. His books have been translated into 56 languages, and as of 2012, sold over 200 million copies. Three of them, Angels & Demons (2000), The Da Vinci Code (2003) and Inferno (2013) have been adapted into films.'
    },
    {
      firstName: 'George',
      lastName: 'R.R. Martin',
      // imageUrl:
      //   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Portrait_photoshoot_at_Worldcon_75%2C_Helsinki%2C_before_the_Hugo_Awards_%E2%80%93_George_R._R._Martin.jpg/220px-Portrait_photoshoot_at_Worldcon_75%2C_Helsinki%2C_before_the_Hugo_Awards_%E2%80%93_George_R._R._Martin.jpg',
      bio:
        'George R.R. Martin is an American novelist and short-story writer in the fantasy, horror, and science fiction genres, screenwriter, and television producer. He is best known for his series of epic fantasy novels, A Song of Ice and Fire, which was later adapted into the HBO series Game of Thrones (2011–present). In 2005, Lev Grossman of Time called Martin "the American Tolkien",[4] and in 2011, he was included on the annual Time 100 list of the most influential people in the world.'
    },
    {
      firstName: 'Gillian',
      lastName: 'Flynn',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Gillian_Flynn_2014_%28cropped%29.jpg/210px-Gillian_Flynn_2014_%28cropped%29.jpg',
      bio:
        'Gillian Flynn is an American writer. Flynn has published three novels, Sharp Objects, Dark Places, and Gone Girl,[5] all three of which have been adapted for film or television. Flynn wrote the adaptations for the 2014 Gone Girl film and the HBO limited series Sharp Objects. She was formerly a television critic for Entertainment Weekly.'
    },
    {
      firstName: 'Catherine',
      lastName: 'Steadman',
      imageUrl:
        'https://images.gr-assets.com/authors/1507661828p5/16847770.jpg',
      bio:
        'Catherine Steadman is an actress and writer based in North London. She is known for her roles in Downton Abbey and Tutankhamun, starring alongside Sam Neill, as well as shows including Breathless, The Inbetweeners, The Tudors, and Fresh Meat. In 2017 she will feature in political thriller Fearless and new BBC comedy Bucket. She also has appeared on stage in the West End including Oppenheimer for the RSC, for which she was nominated for a 2016 Laurence Olivier Award. Something in the Water is her first novel.'
    },
    {
      firstName: 'J.R.R.',
      lastName: 'Tokien',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Tolkien_1916.jpg/220px-Tolkien_1916.jpg',
      bio:
        'J.R.R. Tolkien was an English writer, poet, philologist, and university professor who is best known as the author of the classic high fantasy works The Hobbit, The Lord of the Rings, and The Silmarillion. He served as the Rawlinson and Bosworth Professor of Anglo-Saxon and Fellow of Pembroke College, Oxford, from 1925 to 1945 and Merton Professor of English Language and Literature and Fellow of Merton College, Oxford, from 1945 to 1959.[1] He was at one time a close friend of C. S. Lewis—they were both members of the informal literary discussion group known as the Inklings. Tolkien was appointed a Commander of the Order of the British Empire by Queen Elizabeth II on 28 March 1972.'
    },
    {
      firstName: 'Kevin',
      lastName: 'Kwan',
      imageUrl:
        'https://s1.r29static.com//bin/entry/ecd/340x408,80/2001827/image.jpg',
      bio:
        'Kevin Kwan is a Singaporean–American novelist best known for his satirical novels Crazy Rich Asians, China Rich Girlfriend and Rich People Problems. In 2014, Kwan was named as one of the "Five Writers to Watch" on the list of Hollywood\'s Most Powerful Authors published by The Hollywood Reporter.[2] In 2018, Kwan made Time magazine\'s list of 100 most influential people[3] and was inducted into The Asian Hall of Fame, a project of the Robert Chinn Foundation established in 2004.'
    },
    {
      firstName: 'John',
      lastName: 'Green',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/John_Green_by_Gage_Skidmore.jpg/220px-John_Green_by_Gage_Skidmore.jpg',
      bio:
        "John Green is an American author, vlogger, writer, producer, actor, editor, and educator. He won the 2006 Printz Award for his debut novel, Looking for Alaska,[2] and his sixth novel, The Fault in Our Stars, debuted at number one on The New York Times Best Seller list in January 2012.[3] The 2014 film adaptation opened at number one at the box office.[4] In 2014, Green was included in Time magazine's list of The 100 Most Influential People in the World.[5] Another film based on a Green novel, Paper Towns, was released on July 24, 2015."
    },
    {
      firstName: 'Neil',
      lastName: 'deGrasse Tyson',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Neil_deGrasse_Tyson_in_June_2017_%28cropped%29.jpg/200px-Neil_deGrasse_Tyson_in_June_2017_%28cropped%29.jpg',
      bio:
        'Neil deGrasse Tyson is an American astrophysicist, author, and science communicator. Since 1996, he has been the Frederick P. Rose Director of the Hayden Planetarium at the Rose Center for Earth and Space in New York City. The center is part of the American Museum of Natural History, where Tyson founded the Department of Astrophysics in 1997 and has been a research associate in the department since 2003.'
    },
    {
      firstName: 'Stephen',
      lastName: 'King',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stephen_King%2C_Comicon.jpg/220px-Stephen_King%2C_Comicon.jpg',
      bio:
        'Stephen King is an American author of horror, supernatural fiction, suspense, science fiction and fantasy. His books have sold more than 350 million copies,[2] many of which have been adapted into feature films, miniseries, television series, and comic books. King has published 58 novels, including seven under the pen name Richard Bachman, and six non-fiction books. He has written around 200 short stories, most of which have been published in book collections.'
    },
    {
      firstName: 'Daniel J.',
      lastName: 'Siegel',
      imageUrl:
        'https://pbs.twimg.com/profile_images/420573197277208576/iSU2EAFO_400x400.jpeg',
      bio:
        'Daniel J. Siegel is a clinical professor of psychiatry at the UCLA School of Medicine and Executive Director of the Mindsight Institute.'
    },
    {
      firstName: 'R.L.',
      lastName: 'Stine',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/R_l_stine_2008.jpg/220px-R_l_stine_2008.jpg',
      bio:
        'R.L. Stine is an American novelist, short story writer, television producer, screenwriter, and executive editor.Stine has been referred to as the "Stephen King of children\'s literature"[1] and is the author of hundreds of horror fiction novels, including the books in the Fear Street, Goosebumps, Rotten School, Mostly Ghostly, and The Nightmare Room series. Some of his other works include a Space Cadets trilogy, two Hark gamebooks, and dozens of joke books. As of 2008, Stine\'s books have sold over 400 million copies.'
    },
    {
      firstName: 'Lisa',
      lastName: 'Regan',
      imageUrl: 'https://images.gr-assets.com/authors/1342462786p5/6443334.jpg',
      bio:
        'Lisa Regan is a suspense novelist. She has a Bachelor’s Degree in English and Master of Education Degree from Bloomsburg University. She lives in Philadelphia with her husband and daughter.'
    }
  ]

  // const seedingBooks = () => Promise.all(books.map(book => Book.create(book)))
  // const seedingAuthors = () =>
  //    Promise.all(authors.map(author => Author.create(author)))

  const authorList = await Promise.all(
    authors.map(author => Author.create(author))
  )
  console.log(authorList)
  await Promise.all(books.map(book => Book.create(book)))

  // await seedingAuthors()
  // await seedingBooks()

  console.log('seeding success!')
  db.close()
}

seed().catch(err => {
  console.error('Oh noes! Something went wrong!')
  console.error(err)
  db.close()
})

// const main = () => {
//   console.log('Syncing db...')
//   db
//     .sync({force: true})
//     .then(() => {
//       console.log('Seeding databse...')
//       return seed()
//     })
//     .catch(err => {
//       console.log('Error while seeding')
//       console.log(err.stack)
//     })
//     .then(() => {
//       db.close()
//       return null
//     })
// }

// main()

// pre populated USERS
// const db = require('../server/db')
// const {User} = require('../server/db/models')

// async function seed() {
//   await db.sync({force: true})
//   console.log('db synced!')

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])

//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// // We've separated the `seed` function from the `runSeed` function.
// // This way we can isolate the error handling and exit trapping.
// // The `seed` function is concerned only with modifying the database.
// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // `Async` functions always return a promise, so we can use `catch` to handle
// // any errors that might occur inside of `seed`.
// if (module === require.main) {
//   runSeed()
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed
