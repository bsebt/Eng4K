from google.cloud import vision
from google.cloud import storage
from google.protobuf import json_format
from google.oauth2 import service_account

def extract_text(file_uri, output_uri):
    #creds = service_account.Credentials.from_service_account_file('dataanalytics-creds.json')
    client = vision.ImageAnnotatorClient()

    feature = vision.types.Feature(
        type=vision.enums.Feature.Type.DOCUMENT_TEXT_DETECTION)

    gcs_source = vision.types.GcsSource(uri='gs://' + file_uri[3:])
    input_config = vision.types.InputConfig(
        gcs_source=gcs_source, mime_type='application/pdf')
    gcs_destination = vision.types.GcsDestination(uri='gs://' + output_uri[3:] + '/extracted_text/' + file_uri.split('/')[-1] + '/')

    output_config = vision.types.OutputConfig(
        gcs_destination=gcs_destination, batch_size=1)

    async_request = vision.types.AsyncAnnotateFileRequest(
        features=[feature], input_config=input_config,
        output_config=output_config)

    operation = client.async_batch_annotate_files(
        requests=[async_request])

    operation.result(timeout=180)

def get_blob_as_string(bucket_name, blob_name):
    
