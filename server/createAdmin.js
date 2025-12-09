const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const readline = require('readline');

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

const createAdmin = async () => {
  try {
    console.log('=== Crear Usuario Administrador ===\n');

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const name = await question('Nombre completo: ');
    const email = await question('Email: ');
    const password = await question('Contraseña: ');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('\n❌ Ya existe un usuario con ese email');
      process.exit(1);
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: 'admin'
    });

    console.log('\n✅ Usuario administrador creado exitosamente!');
    console.log('Detalles:');
    console.log(`  Nombre: ${admin.name}`);
    console.log(`  Email: ${admin.email}`);
    console.log(`  Rol: ${admin.role}`);
    console.log('\nYa puedes iniciar sesión con este usuario.');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
