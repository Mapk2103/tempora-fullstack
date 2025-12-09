const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const listUsers = async () => {
  try {
    console.log('Conectando a MongoDB...\n');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const users = await User.find({});

    if (users.length === 0) {
      console.log('❌ No hay usuarios en la base de datos');
      console.log('\nCrea un usuario admin ejecutando:');
      console.log('  npm run create-admin');
    } else {
      console.log(`📋 Total de usuarios: ${users.length}\n`);
      console.log('════════════════════════════════════════════════════════════');

      users.forEach((user, index) => {
        console.log(`\n👤 Usuario ${index + 1}:`);
        console.log(`   ID:     ${user._id}`);
        console.log(`   Nombre: ${user.name}`);
        console.log(`   Email:  ${user.email}`);
        console.log(`   Rol:    ${user.role}`);
        console.log(`   Creado: ${user.createdAt}`);
        console.log('─────────────────────────────────────────────────────────────');
      });

      console.log('\n💡 Para hacer login usa:');
      console.log('   Email: (el email de arriba)');
      console.log('   Contraseña: (la que usaste al crear el usuario)');
    }

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
};

listUsers();
