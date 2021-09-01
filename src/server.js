import Bootstrap from './app/bootstrap.js';

const boostrap = new Bootstrap();
boostrap.run((port) =>
  console.log(`Server started and running on port ${port}`)
);
