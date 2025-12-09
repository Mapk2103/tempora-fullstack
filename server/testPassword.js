const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const testPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const email = 'amin@tempora.com';
    const passwordsToTest = ['123456', 'Admin123', 'admin123', '123456789'];

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('❌ Usuario no encontrado');
      process.exit(1);
    }

    console.log(`🔍 Probando contraseñas para: ${email}\n`);

    for (const password of passwordsToTest) {
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        console.log(`✅ ¡CONTRASEÑA CORRECTA!`);
        console.log(`   La contraseña es: "${password}"`);
        console.log(`\n💡 Usa estas credenciales para login:`);
        console.log(`   Email:      ${email}`);
        console.log(`   Contraseña: ${password}`);
        process.exit(0);
      } else {
        console.log(`❌ NO es: "${password}"`);
      }
    }

    console.log('\n❌ Ninguna de las contraseñas comunes funcionó.');
    console.log('\n💡 Solución: Resetea la contraseña ejecutando:');
    console.log('   npm run reset-password');

    process.exit(1);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
};

testPassword();
