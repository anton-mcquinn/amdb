const movies = require("./movies.json");
const genres = require("./genres.json");
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const sequelize = new Sequelize(
  process.env.PGDATABASE, 
  process.env.PGUSER, 
  process.env.PGPASSWORD, 
  {
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT, 10),
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  }
);

const User = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    decade: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    genre: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    fiveStarMovies: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    fourStarMovies: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    threeStarMovies: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  }
);

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
      type: DataTypes.STRING(1234),
    }, 
    year: {
      type: DataTypes.INTEGER,
    },
    cast: {
      type: DataTypes.ARRAY(DataTypes.STRING(1234)),
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING(1234)),
    },
    href: {
      type: DataTypes.STRING(1234),
    },
    extract: {
      type: DataTypes.TEXT,
    },
    thumbnail: {
      type: DataTypes.STRING(1234),
    },
    thumbnail_width: {
      type: DataTypes.INTEGER,
    },
    thumbnail_height: {
      type: DataTypes.INTEGER,
    },
    likes: {
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
    await User.bulkCreate([
      {
        name: "Default User",
        decade: [],
        genre: [],
        fiveStarMovies: [],
        fourStarMovies: [],
        threeStarMovies: [],
      },
    ]);
    console.log("Database seeded successfully.");
  } catch(e) {
    console.log("Error seeding database with movies:", e);
  }
}
seedDatabase();
