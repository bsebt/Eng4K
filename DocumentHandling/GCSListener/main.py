import FireUtils
import GoogleUtils
import StatUtils

def new_doc_thread(data, context):

    #If new file is uploaded, process it.
    if "uploads/" in data['name']:

        #Print initialization message to log.
        print('New doc uploaded', data['name'][8:], 'Handling...')

        #Get current bucket object.
        bucket = FireUtils.get_storage_bucket(data['bucket'])

        #Get the uri of the uploaded file.
        file_url = FireUtils.get_firebase_file_url(bucket, data['name'])

        #Make API call to Google Vision to extract text from file.
        GoogleUtils.extract_text(file_url, bucket.path)

        

        #Print completion message to log.
        print('Doc', data[name][8:],  'handled! Output file created.')

    #Else disregard the file.
    else:
        print('New doc uploaded', data['name'], 'But not in UPLOADS folder.')
