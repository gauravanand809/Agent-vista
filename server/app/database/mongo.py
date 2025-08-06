from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)

db = client["agent_vista"]
user_collection = db["users_collection"]
password_reset_tokens_collection = db["password_reset_tokens"]
test_collection = db["test_collection"]
