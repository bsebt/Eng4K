import firebase_admin
import re
from urllib.parse import unquote
from firebase_admin import credentials, firestore, db
from google.cloud.storage import Bucket
from google.cloud import storage

def get_storage_bucket(bucket_name):
    #cred = credentials.Certificate(creds)
    #firebase_admin.initialize_app(cred, {
        #'storageBucket': 'dataanalytics-62317.appspot.com'
        #})
    return storage.Client().get_bucket(bucket_name)

def get_firebase_file_url(bucket, filename):
    uri = bucket.get_blob(filename).path
    return unquote(re.sub('o/', '', uri))

def get_firestore_db():
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred)
    return firestore.client()

#def write_to_firestore(payload):
