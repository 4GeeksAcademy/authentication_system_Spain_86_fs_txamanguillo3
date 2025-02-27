from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)  
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    age = db.Column(db.Integer, nullable=True) 
    location = db.Column(db.String(100), nullable=True)  
    description = db.Column(db.Text, nullable=True)    
    profile_image = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "age": self.age,
            "location": self.location,
            "description": self.description,
            "profileImage": self.profile_image,
            "is_admin": self.is_admin,
            # do not serialize the password, its a security breach
        }
    

class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)         # Antes: nombre
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)           # Antes: descripcion
    image_url = db.Column(db.String(255), nullable=False)        # Antes: imagen_url

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.name,
            "price": self.price,
            "description": self.description,
            "imageId": self.image_url
        }

class Promotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "image_url": self.image_url
        }
    
    
class Cart(db.Model):
    __tablename__ = 'cart'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    
    quantity = db.Column(db.Integer, nullable=False, default=1)
    user = db.relationship("User", backref=db.backref("cart_items", lazy=True))
    product = db.relationship("Product")
    
    def __repr__(self):
        return f'<Cart {self.id} - Product {self.product_id} - Qty {self.quantity}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.serialize() if self.user else None,
            "product": self.product.serialize() if self.product else None,
            "quantity": self.quantity
        }