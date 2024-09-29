const { Pool } = require('pg');

// Configuração da conexão com o PostgreSQL (substitua a senha)
const pool = new Pool({
  connectionString: 'postgresql://postgres.udxkhssnnpjdmvidjcdu:ZV70qztLfoD5Epq2@aws-0-us-west-1.pooler.supabase.com:6543/postgres',
});

// Testando a conexão
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados:', err.stack);
  }
  console.log('Conexão bem-sucedida com o banco de dados!');
  release();
});
