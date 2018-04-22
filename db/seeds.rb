# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Quote.delete_all

Quote.create! (
  [
    {
      text: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde"
    },
    {
      text: "Two things are infinite: the universe and human stupidity; " \
            "and I'm not sure about the universe.",
      author: "Albert Einstein"
    },
    {
      text: "So many books, so little time.",
      author: "Frank Zappa"
    },
    {
      text: "Be the change that you wish to see in the world",
      author: "Mahatma Gandhi"
    },
    {
      text: "If you tell the truth, you don't have to remember anything.",
      author: "Mark Twain"
    },
    {
      text: "Two things are infinite: the universe and human stupidity; " \
            "and I'm not sure about the universe.",
      author: "Albert Einstein"
    },
    {
      text: "So many books, so little time.",
      author: "Frank Zappa"
    },
    {
      text: "Be the change that you wish to see in the world",
      author: "Mahatma Gandhi"
    },
    {
      text: "If you tell the truth, you don't have to remember anything.",
      author: "Mark Twain"
    },
    {
      text: "Two things are infinite: the universe and human stupidity; " \
            "and I'm not sure about the universe.",
      author: "Albert Einstein"
    },
    {
      text: "So many books, so little time.",
      author: "Frank Zappa"
    },
    {
      text: "Be the change that you wish to see in the world",
      author: "Mahatma Gandhi"
    },
    {
      text: "If you tell the truth, you don't have to remember anything.",
      author: "Mark Twain"
    }
  ]
)
puts "Quotes seeded!"