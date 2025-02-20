from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Cart
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
import requests
import base64
import stripe



CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME", "dmo7oubln")
API_KEY = os.environ.get("CLOUDINARY_API_KEY", "525655867213797")
API_SECRET = os.environ.get("CLOUDINARY_API_SECRET", "vs0x8sROaO_77RaoO2L8sZm4BQM")
FOLDER_NAME = "products"

api = Blueprint('api', __name__)

stripe.api_key = "sk_test_51QtocuCZ14sPuAqB37UVZKAg0rKQ8zpRSXKQHi0CnJabEpSsqJFMmIk4SbqQvv42pYXGDRvjyKE2FNG09n7CK6m100Yw94nu2z"
                    
CORS( api )

@api.route("signup", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    
    if user is None:
        new_user = User(email=email, password=password, is_active=True)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "usuario creado"}), 200
    return jsonify({"msg": "el usuario ya existe"}), 400
    


@api.route("login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "usuario o email incorrectos"}), 400
    access_token = create_access_token(identity=user.email)
    return jsonify({"token": access_token}), 200


@api.route("profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()
    if not user:
        return jsonify({"msg": "usuario no encontrado"}), 400
    return jsonify(user.serialize()), 200


@api.route("/profile", methods=["PUT"])
@jwt_required()  
def update_profile():
    user_email = get_jwt_identity()

    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    data = request.get_json()

    user.name = data.get("name", user.name)
    user.age = data.get("age", user.age)
    user.location = data.get("location", user.location)
    user.description = data.get("description", user.description)
    user.profile_image = data.get("profileImage", user.profile_image)

    db.session.commit()

    return jsonify({"msg": "Perfil actualizado correctamente"}), 200

# ----------------------------------------------------------------------

@api.route('products', methods=['GET'])
def get_products():
    products = Product.query.all()
    # Retornamos una lista (vacía en caso de no haber productos) con la serialización de cada producto.
    return jsonify([p.serialize() for p in products]), 200


@api.route('products', methods=['POST'])
def create_product():
    data = request.get_json()
    try:
        new_product = Product(
            name=data.get('name'),
            price=data.get('price'),
            description=data.get('description'),
            image_url=data.get('image_url')
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({
            "msg": "Product created successfully",
            "product": new_product.serialize()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    

@api.route('/products', methods=['GET'])
def import_images_for_products():
    auth = base64.b64encode(f"{API_KEY}:{API_SECRET}".encode("utf-8")).decode("utf-8")
    url = f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/resources/image/upload?prefix={FOLDER_NAME}"
    
    response = requests.get(url, headers={"Authorization": f"Basic {auth}"})
    if response.status_code != 200:
        return jsonify({"error": "Error al cargar imágenes"}), response.status_code

    data = response.json()
    # Retorna, por ejemplo, una lista de URLs o la data completa
    return jsonify(data), 200

    

@api.route('cart', methods=['GET'])
def get_cart():
    carts = Cart.query.all()
    def serialize(self):
        return {
            "id": self.id,
            "product": self.product.serialize() if self.product else None
        }
    serialized_cart = [c.serialize() for c in carts]
    # Retornamos una lista, incluso si está vacía.
    return jsonify(serialized_cart), 200

@api.route('/create-payment', methods=['POST'])
def create_payment():
    response_body = {}
    try:
        data = request.json
        intent = stripe.PaymentIntent.create(amount=data['amount'],
                                             currency=data['currency'],
                                             automatic_payment_methods={'enabled': True})
        response_body['client_secret'] = intent['client_secret']
        return response_body, 200
    except Exception as e:
        response_body['success'] = False
        response_body['error'] = str(e)
        return response_body, 403

    

