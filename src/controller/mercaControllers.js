// SDK de Mercado Pago
import mercadopago from "mercadopago";
import {ACCESS_TOKEN} from "../config.js";

export const crearorden = async (req, res) =>{

    mercadopago.configure({
        access_token: ACCESS_TOKEN,
    });

    let {items} = req.body

    if(!items){
        res.status(403)
        res.send({error: 'No se están enviando los items para la creación de la preferencia'})
    }

    else {
        console.log(items)
        let preference = {
            "items": [...items],
            "payer": {
                "name": req.body.name,
                "email": req.body.correo,
            },
            "back_urls": {
                "success": "http://localhost:3000/feedback",
                "failure": "http://localhost:3000/feedback",
                "pending": "http://localhost:3000/feedback"
            },
            "auto_return": "approved",
            "taxes": [{
                "type": "IVA",
                "value": 0
            }],
            "notification_url": "https://6b3a-186-82-84-0.ngrok.io/notificacion",
            "statement_descriptor": "DOCS API"
        };
        mercadopago.preferences
            .create(preference)
            .then(function (response) {
                res.json({
                    pago_mer: response.body.init_point
                });
            })
            .catch(function (error) {
                console.log(error);
                res.status(403)
                res.send({error: 'Revise los datos para la creación de la orden, datos necesarios {quantity y unit_price'})
            });
    }
}

export const feedback = function (req, res){
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_orders_id
    })
}

export const notificacionorden = async (req, res) =>{
    const datos = req.query;
    console.log(datos);
    res.status(200);
}
