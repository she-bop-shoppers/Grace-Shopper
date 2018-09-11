const db = require('./server/db');
const User = require('./server/db/models/user');
const Book = require('./server/db/models/book');
const Author = require('./server/db/models/author');
const Review = require('./server/db/models/review');
const SalesOrder = require('./server/db/models/salesOrder');
const OrderItem = require('./server/db/models/orderItem');

const books = [{
  title: 'Harry Potter and the Goblet of Fire',
  price: 19.99,
  genre: 'Young Adult Novel',
  description: 'The Triwizard Tournament is to be held at Hogwarts. Only wizards who are over seventeen are allowed to enter - but that doesn\'t stop Harry dreaming that he will win the competition. Then at Halloween, when the Goblet of Fire makes its selection, Harry is amazed to find his name is one of those that the magical cup picks out. He will face death-defying tasks, dragons, and dark wizards, but with the help of his best friends, Ron and Hermione, he might just make it through - alive! ',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41QJuh3D23L.jpg',
  authorId: 1
},
{
  title: 'The Handmaid\'s Tale',
  price: 14.95,
  genre: 'Fiction',
  description: 'The Handmaid\'s Tale is a novel of such power that the reader will be unable to forget its images and its forecast. Set in the near future, it describes life in what was once the United States and is now called the Republic of Gilead, a monotheocracy that has reacted to social unrest and a sharply declining birthrate by reverting to, and going beyond, the repressive intolerance of the original Puritans. The regime takes the Book of Genesis absolutely at its word, with bizarre consequences for the women and men in its population.The story is told through the eyes of Offred, one of the unfortunate Handmaids under the new social order. In condensed but eloquent prose, by turns cool-eyed, tender, despairing, passionate, and wry, she reveals to us the dark corners behind the establishment’s calm facade, as certain tendencies now in existence are carried to their logical conclusions. The Handmaid\'s Tale is funny, unexpected, horrifying, and altogether convincing. It is at once scathing satire, dire warning, and a tour de force. It is Margaret Atwood at her best.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41jyiUgqHWL.jpg',
  authorId: 2
},
{
  title: 'The DaVinci Code',
  price: 13.95,
  genre: 'Thrillers & Suspense',
  description: 'As millions of readers around the globe have already discovered, The Da Vinci Code is a reading experience unlike any other. Simultaneously lightning-paced, intelligent, and intricately layered with remarkable research and detail, Dan Brown\'s novel is a thrilling masterpiece—from its opening pages to its stunning conclusion.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51hYdKyWYqL.jpg',
  authorId: 3
},
{
  title: 'A Game of Thrones: A Song of Ice and Fire',
  price: 19.95,
  genre: 'Fiction',
  description: 'From a master of contemporary fantasy comes the first novel of a landmark series unlike any you’ve ever read before. With A Game of Thrones, George R. R. Martin has launched a genuine masterpiece, bringing together the best the genre has to offer. Mystery, intrigue, romance, and adventure fill the pages of this magnificent saga, the first volume in an epic series sure to delight fantasy fans everywhere.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/518dkA0JEpL.jpg',
  authorId: 4
},
{
  title: 'Sharp Objects',
  price: 19.95,
  genre: 'Thrillers & Suspense',
  description: 'Fresh from a brief stay at a psych hospital, reporter Camille Preaker faces a troubling assignment: she must return to her tiny hometown to cover the murders of two preteen girls. For years, Camille has hardly spoken to her neurotic, hypochondriac mother or to the half-sister she barely knows: a beautiful thirteen-year-old with an eerie grip on the town. Now, installed in her old bedroom in her family\'s Victorian mansion, Camille finds herself identifying with the young victims—a bit too strongly. Dogged by her own demons, she must unravel the psychological puzzle of her own past if she wants to get the story—and survive this homecoming.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51vrmMF6K7L.jpg',
  authorId: 5
},
{
  title: 'A Case of Need',
  price: 24.95,
  genre: 'Thrillers & Suspense',
  description: 'In the tightly knit world of Boston medicine, the Randall family reigns supreme. When heart surgeon J. D. Randall’s teenage daughter dies during a botched abortion, the medical community threatens to explode. Was it malpractice? A violation of the Hippocratic Oath? Or was Karen Randall murdered in cold blood?The natural suspect is Arthur Lee, a brilliant surgeon and known abortionist, who has been carrying out the illegal procedure with the help of pathologist John Berry. After Karen dies, Lee is thrown in jail on a murder charge, and only Berry can prove his friend wasn’t the one who wielded the scalpel. Behind this gruesome death, Berry will uncover a secret that would shock even the most hardened pathologist. An Edgar Award–winning novel by the author of such blockbusters as The Andromeda Strain and Jurassic Park—and creator of the long-running NBC drama ER—A Case of Need is a “superb” medical-thriller mystery (Los Angeles Times).',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51MCT9rFURL.jpg',
  authorId: 6
},
{
  title: 'Something in the Water',
  price: 14.95,
  genre: 'Thrillers & Suspense',
  description: 'Erin is a documentary filmmaker on the brink of a professional breakthrough, Mark a handsome investment banker with big plans. Passionately in love, they embark on a dream honeymoon to the tropical island of Bora Bora, where they enjoy the sun, the sand, and each other. Then, while scuba diving in the crystal blue sea, they find something in the water. . . .',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51GyaUIKFOL.jpg',
  authorId: 7
},
{
  title: 'Lord of the Rings',
  price: 14.95,
  genre: 'Fiction',
  description: 'The Lord of the Rings tells of the great quest undertaken by Frodo and the Fellowship of the Ring: Gandalf the Wizard; the hobbits Merry, Pippin, and Sam; Gimli the Dwarf; Legolas the Elf; Boromir of Gondor; and a tall, mysterious stranger called Strider.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51eq24cRtRL._SX331_BO1,204,203,200_.jpg',
  authorId: 8
},
{
  title: 'China Rich Girlfriend',
  price: 14.95,
  genre: 'Fiction',
  description: 'It’s the eve of Rachel Chu’s wedding, and she should be over the moon. She has a flawless Asscher-cut diamond, a wedding dress she loves, and a fiancé willing to thwart his meddling relatives and give up one of the biggest fortunes in Asia in order to marry her. Still, Rachel mourns the fact that her birthfather, a man she never knew, won’t be there to walk her down the aisle. Then a chance accident reveals his identity. Suddenly, Rachel is drawn into a dizzying world of Shanghai splendor, a world where people attend church in a penthouse, where exotic cars race down the boulevard, and where people aren’t just crazy rich … they’re China rich.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41xsiJ8NmdL.jpg',
  authorId: 9
},
{
  title: 'The Fault in Our Stars',
  price: 14.95,
  genre: 'Young Adult Novel',
  description: 'Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel\'s story is about to be completely rewritten.Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning-author John Green\'s most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51zMqctJBEL._SX312_BO1,204,203,200_.jpg',
  authorId: 10
},
{
  title: 'Harry Potter and the Prisoner of Azkaban',
  price: 12.77,
  genre: 'Young Adult Novel',
  description: 'When the Knight Bus crashes through the darkness and screeches to a halt in front of him, it\'s the start of another far from ordinary year at Hogwarts for Harry Potter. Sirius Black, escaped mass-murderer and follower of Lord Voldemort, is on the run - and they say he is coming after Harry. In his first ever Divination class, Professor Trelawney sees an omen of death in Harry\'s tea leaves... But perhaps most terrifying of all are the Dementors patrolling the school grounds, with their soul-sucking kiss...',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51NuYi4-XoL.jpg',
  authorId: 1
},
{
  title: 'The Blind Assasin',
  price: 10.10,
  genre: 'Fiction',
  description: 'In The Blind Assassin, Margaret Atwood weaves together strands of gothic suspense, romance, and science fiction into one utterly spellbinding narrative. The novel begins with the mysterious death—a possible suicide—of a young woman named Laura Chase in 1945. Decades later, Laura’s sister Iris recounts her memories of their childhood, and of the dramatic deaths that have punctuated their wealthy, eccentric family’s history. Intertwined with Iris’s account are chapters from the scandalous novel that made Laura famous, in which two illicit lovers amuse each other by spinning a tale of a blind killer on a distant planet. These richly layered stories-within-stories gradually illuminate the secrets that have long haunted the Chase family, coming together in a brilliant and astonishing final twist.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51ZB1cOs9PL.jpg',
  authorId: 2
},
{
  title: 'Astrophysics for People in a Hurry ',
  price: 13.26,
  genre: 'Non-fiction',
  description: 'What is the nature of space and time? How do we fit within the universe? How does the universe fit within us? There’s no better guide through these mind-expanding questions than acclaimed astrophysicist and best-selling author Neil deGrasse Tyson. But today, few of us have time to contemplate the cosmos. So Tyson brings the universe down to Earth succinctly and clearly, with sparkling wit, in tasty chapters consumable anytime and anywhere in your busy day.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51CeYGN%2Bc0L._SX306_BO1,204,203,200_.jpg',
  authorId: 11
},
{
  title: 'IT',
  price: 18.65,
  genre: 'Horror',
  description: 'Welcome to Derry, Maine. It\'s a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real. They were seven teenagers when they first stumbled upon the horror. Now they are grown-up men and women who have gone out into the big world to gain success and happiness. But the promise they made 28 years ago calls them to reunite in the same place where, as teenagers, they battled an evil creature that preyed on the city\'s children. Now children are being murdered again, and their repressed memories of that terrifying summer return as they prepare to once again battle the monster lurking in Derry\'s sewers.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/418XRMEX2UL._SX320_BO1,204,203,200_.jpg',
  authorId: 12
},
{
  title: 'Pet Sematary',
  price: 18.65,
  genre: 'Horror',
  description: 'Welcome to Derry, Maine. It\'s a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real. They were seven teenagers when they first stumbled upon the horror. Now they are grown-up men and women who have gone out into the big world to gain success and happiness. But the promise they made 28 years ago calls them to reunite in the same place where, as teenagers, they battled an evil creature that preyed on the city\'s children. Now children are being murdered again, and their repressed memories of that terrifying summer return as they prepare to once again battle the monster lurking in Derry\'s sewers.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51vN64ub8-L._SX326_BO1,204,203,200_.jpg',
  authorId: 12
},
{
  title: 'Aware: The Science and Practice of Presence',
  price: 19.04,
  genre: 'Non-fiction',
  description: 'An in-depth look at the science that underlies meditation\'s effectiveness, this book teaches readers how to harness the power of the principle "Where attention goes, neural firing flows, and neural connection grows." Siegel reveals how developing a Wheel of Awareness practice to focus attention, open awareness, and cultivate kind intention can literally help you grow a healthier brain and reduce fear, anxiety, and stress in your life. ',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41%2BwB07rAyL._SX327_BO1,204,203,200_.jpg',
  authorId: 13
},
{
  title: 'Gone Girl',
  price: 13.79,
  genre: 'Thrillers & Suspense',
  description: 'Marriage can be a real killer. One of the most critically acclaimed suspense writers of our time, New York Times best seller Gillian Flynn, takes that statement to its darkest place in this unpausable masterpiece about a marriage gone terribly, terribly wrong. The Chicago Tribune proclaimed that her work "draws you in and keeps you reading with the force of a pure but nasty addiction." Gone Girl\'s toxic mix of sharp-edged wit and deliciously chilling prose creates a nerve-fraying thriller that confounds you at every turn.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41etyGVwOwL._SX326_BO1,204,203,200_.jpg',
  authorId: 5
},
{
  title: 'The Haunted Mask',
  price: 16.92,
  genre: 'Horror',
  description: 'Carly Beth thinks she\'s found the best Halloween mask ever. With yellow-green skin and long animal fangs, the mask terrifies the entire neighborhood. Before long, it has a surprising effect on Carly Beth, too. She tries to take it off . . . but it won\'t budge!Halloween is almost over, but fright night is just beginning.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51OdpP6e0TL.jpg',
  authorId: 14
},
{
  title: 'Her Mother\'s Grave',
  price: 10.99,
  genre: 'Thrillers & Suspense',
  description: 'When two young boys discover human bones buried beneath a tree in a trailer park, Detective Josie Quinn races to join her team at the scene. She used to play in those woods as a child, happier outside and away from her abusive mother, Belinda Rose. Josie’s past crashes into her present when a rare dental condition confirms the bones belong to a teenage foster-child who was murdered thirty years ago. A girl named Belinda Rose...',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51O5AldHNWL.jpg',
  authorId: 15
},
{
  title: 'Jurassic Park',
  price: 19.11,
  genre: 'Thrillers & Suspense',
  description: 'An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankind’s most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them—for a price.',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51Sh8gB0bfL._SY346_.jpg',
  authorId: 6
}]



const seed = () =>
  Promise.all(books.map(author =>
    Book.create(book))
  )
  .then(() =>
  Promise.all(authors.map(author =>
    Author.create(author))
  ))
  .then(() =>
  Promise.all(reviews.map(review =>
    Review.create(review))
  )
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
