const movies = require("./movies-2000s.json");
const genres = require("./genres.json");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("amdb", "anthonymcintosh", null, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
});

const Genre = sequelize.define(
  "genre",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  }
);

const Movie = sequelize.define(
  "movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    }, 
    year: {
      type: DataTypes.INTEGER,
    },
    cast: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    href: {
      type: DataTypes.STRING,
    },
    extract: {
      type: DataTypes.TEXT,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    thumbnail_width: {
      type: DataTypes.INTEGER,
    },
    thumbnail_height: {
      type: DataTypes.INTEGER,
    },
  }
)

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await Genre.bulkCreate(genres);
    await Movie.bulkCreate(movies);
    console.log("Database seeded successfully.");
  } catch(e) {
    console.log("Error seeding database with movies:", e);
  }
}
seedDatabase();
