const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express")
const app = express();
const admin = require("firebase-admin");
const credentials = require("./key.json");
const stripe = require('stripe')('sk_test_51N75MIGD6rvnwVkTFtBSmdDduY8PZwRC88wo90jCkiWVx6RljIXff6Ezjv5Oym2LTX6dUeLLXYgxD5w6cQ9RZt0m00TteEuftQ');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


  admin.initializeApp({
    credential: admin.credential.cert(credentials)
  });

  const db = admin.firestore();

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  
  
  app.post('/payment-sheet', async (req, res) => {
    const { price } = req.body;
    if (typeof price !== 'number' || price < 1) {
      return res.status(400).json({ error: 'Invalid price' });
    }
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-11-15' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100),
      currency: 'clp',
      customer: customer.id,
      payment_method_types: ['card'],
    });
  
    res.json({
      paymentIntent: paymentIntent.client_secret, // Cambio aquí: enviar solo el client_secret en lugar del objeto completo
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51N75MIGD6rvnwVkTDi2rwCqgzXzroP7Osg6FjbznpuZyFqCTKrhtYpDYjuXvCm1AqhFSFfuFpo5CunviTZnyH52K00HWd3jwyP'
    });
  });
  
  
  app.post('/transacciones', (req, res) => {
    try {
      const DueñoId = req.body. DueñoId;
      const userId = req.body.userId;
      const estacionamientoId = req.body.estacionamientoId;
      
      // Obtener la hora y fecha actual
      const fechaActual = new Date();

      // Crear un nuevo documento en la colección "Transacción"
      const transaccionRef = db.collection('Transaccion').doc();
      const nuevaTransaccion = {
        userId,
        estacionamientoId,
        DueñoId,
        fecha: fechaActual,
      };
      
      // Guardar los datos en el documento
      transaccionRef.set(nuevaTransaccion);

      res.status(200).json({ message: 'Transacción creada correctamente' });
    } catch (error) {
      console.error('Error al crear la transacción:', error);
      res.status(500).json({ error: 'Error al crear la transacción' });
    }
  });

  app.get('/ultima-transaccion/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Obtener la última transacción del usuario
      const transaccionesRef = db.collection('Transaccion')
        .where('userId', '==', userId)
        .orderBy('fecha', 'desc')
        .limit(1);
  
      const transaccionesSnapshot = await transaccionesRef.get();
  
      if (transaccionesSnapshot.empty) {
        return res.status(404).json({ error: 'No se encontraron transacciones para el usuario' });
      }
  
      // Obtener los datos de la última transacción
      const ultimaTransaccion = transaccionesSnapshot.docs[0].data();
  
      // Obtener el documento del estacionamiento
      const estacionamientoDoc = await db.collection('estacionamiento').doc(ultimaTransaccion.estacionamientoId).get();
      const estacionamientoData = estacionamientoDoc.data();
  
      // Combinar los datos de la última transacción y el estacionamiento en la respuesta JSON
      const respuesta = {
        ultimaTransaccion: ultimaTransaccion,
        estacionamiento: estacionamientoData
      };
  
      res.json(respuesta);
    } catch (error) {
      console.error('Error al obtener la última transacción:', error);
      res.status(500).json({ error: 'Error al obtener la última transacción' });
    }
  });
  
  
  // Endpoint para manejar el resultado de la hoja de pago
app.post('/payment-sheet-result', async (req, res) => {
  try {

    const { paymentIntentId, success } = req.body;


    if (success) {
      // Acceder al paymentIntentId enviado por el cliente
      console.log('paymentIntentId:', paymentIntentId);

      // Obtener el Payment Intent desde Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      // Crear el objeto con los datos a guardar en Firebase
      const paymentData = {
        paymentIntentId: paymentIntentId,
        amount: paymentIntent.amount,
        // Agrega más propiedades según los datos que desees guardar en la base de datos
      };

   
      console.log('paymentData:', paymentData);

      try {
        // Guardar los datos en Firebase
        const docRef = await db.collection('Pagos').add(paymentData);
        console.log('Documento creado:', docRef.id);
        res.status(200).send('Payment succeeded');
      } catch (error) {
        console.error('Error al guardar el documento en Firestore:', error);
        res.status(500).send('Error al guardar el documento en Firestore');
      }
    } else {
      await stripe.paymentIntents.cancel(paymentIntentId);
      res.status(200).send('Payment canceled');
    }
  } catch (error) {
    console.error('Error handling payment sheet result:', error);
    res.status(500).send('Error handling payment sheet result');
  }
});

 

app.post('/update-parking-space-status/:estacionamientoId', async (req, res) => {
  const estacionamientoId = req.params.estacionamientoId;
  try {
    // Obtener el documento del estacionamiento
    const parkingRef = db.collection('estacionamiento').doc(estacionamientoId);
    const parkingDoc = await parkingRef.get();

    if (parkingDoc.exists) {
      const parkingData = parkingDoc.data();

     

      const espacios = parkingData.espacios;

   

      // Buscar el primer espacio disponible
      const espacioIndex = espacios.findIndex(espacio => espacio === true);

    

      if (espacioIndex !== -1) {
        // Crear un nuevo arreglo con los mismos valores
        const nuevosEspacios = [...espacios];

        // Cambiar el valor del espacio a false
        nuevosEspacios[espacioIndex] = false;

   

        await parkingRef.update({
          espacios: nuevosEspacios
        });

        res.status(200).json({ message: 'Estado del espacio actualizado exitosamente' });
      } else {
        res.status(404).json({ error: 'No se encontró ningún espacio disponible' });
      }
    } else {
      res.status(404).json({ error: 'No se encontró el documento del estacionamiento' });
    }
  } catch (error) {
    console.error('Error al actualizar el estado del espacio:', error);
    res.status(500).json({ error: 'Error al actualizar el estado del espacio' });
  }
});







 
  app.get('/estacionamientos', async (req, res) => {
    try {
       const estacionamientoRef = db. collection("estacionamiento");
       const response = await estacionamientoRef.get();
       let responseArr = [];
       response. forEach(doc => {
       responseArr.push (doc.data());
      });
      res. send (responseArr);
      } catch(error) {
      res.send(error);
      }
    }) 
  
  app.post('/create', async (req, res) => {
    try {
      console.log(req.body);
      const id = req.body.email;
      const userJson = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      };
      const response = db.collection("usuario").doc(id).set(userJson);
      res.send(response);
     } catch(error) {
       res.send(error);
     }
  });
  
  //read
  app.get('/read/all', async (req, res) => {
    try {
       const usuarioRef = db. collection("usuario");
       const response = await usuarioRef.get();
       let responseArr = [];
       response. forEach(doc => {
       responseArr.push (doc.data());
      });
      res. send (responseArr);
      } catch(error) {
      res.send(error);
      }
    }) 
  
  //read:id
  app.get('/read/:id', async (req, res) => {
    try {
      const usuarioRef = db.collection("usuario").doc(req.params.id);
      const response = await usuarioRef.get();
      res.send(response.data());
    } catch(error) {
      res.send(error);
    }
  });
  app.get('/estacionamiento/:id', async (req, res) => {
    try {
      const docId = req.params.id;
      const docRef = db.collection('estacionamiento').doc(docId);
      const doc = await docRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ error: 'Documento no encontrado' });
      }
  
      // Devuelve los datos del documento como respuesta
      res.json(doc.data());
    } catch (error) {
      console.error('Error al obtener el documento:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  app.post('/update', async(req, res) => {
      try {
      const id=reg.body.id;
      const newFirstName = "hello world!";
      const userRef = await db.collection ("users").doc (id)
      .update({
      firstName: newFirstName
      });
      res.send (userRef);
      } catch(error) {
      res. send(error);
      }
    });
  
  //delete
  app.delete('/delete/:id', async (req, res) => {
      try {
         const response = await db.collection("usuario").doc(req.params.id).delete();
         res.send(response); 
       } catch(error) {
         res.send(error);
       }
      })

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);  
  });

