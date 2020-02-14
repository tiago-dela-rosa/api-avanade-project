const axios = require("axios");

const objTemplate = () => {
  const names = [
    "Murilo Eduardo",
    "Diego Farias",
    "Lorena Simone",
    "Natália Barbosa"
  ];
  const cpfs = [
    "583.547.779-10",
    "995.832.089-49",
    "613.263.105-42",
    "283.012.595-90"
  ];
  const pass = 123456;
  const emails = [
    "murilo@gmail.com",
    "diego@gmail.com",
    "lorena@gmail.com",
    "natalia@gmail.com"
  ];

  return names.map((user, index) => {
    return {
      fullName: names[index],
      email: emails[index],
      cpf: cpfs[index],
      password: pass,
      balance: 10000
    };
  });
};

const register = () => {
  const rows = objTemplate();
  return rows.map(async function(row, error) {
    try {
      console.log(await axios.post("http://localhost:3000/api/register", row));
      await axios.post("http://localhost:3000/api/register", row);
    } catch (error) {
      console.log(error);
    }
  });
};

if (register()) {
  console.log("Seed com sucesso");
  process.exit(0);
}
