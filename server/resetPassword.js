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

const resetPassword = async () => {
  try {
    console.log('=== Resetear Contraseña de Usuario ===\n');

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const email = await question('Email del usuario: ');

    const user = await User.findOne({ email });

    if (!user) {
      console.log('\n❌ No existe un usuario con ese email');
      process.exit(1);
    }

    console.log(`\n✅ Usuario encontrado:`);
    console.log(`   Nombre: ${user.name}`);
    console.log(`   Email:  ${user.email}`);
    console.log(`   Rol:    ${user.role}\n`);

    const newPassword = await question('Nueva contraseña: ');

    if (newPassword.length < 6) {
      console.log('\n❌ La contraseña debe tener al menos 6 caracteres');
      process.exit(1);
    }

    user.password = newPassword;
    await user.save();

    console.log('\n✅ ¡Contraseña actualizada exitosamente!');
    console.log('\n💡 Ahora puedes hacer login con:');
    console.log(`   Email:      ${user.email}`);
    console.log(`   Contraseña: ${newPassword}`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
};

resetPassword();
