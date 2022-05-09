import boto3
import botocore
import os

BUCKET_NAME = os.environ.get('S3_BUCKET')
S3_LOCATION = f'http://{BUCKET_NAME}.s3.amazonaws.com/'
ALLOWED_IMAGE_EXTENSIONS = {'jpg', 'jpeg', 'png'}

s3 = boto3.client(
    's3',
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
)

def image_upload(file, object_name=None):

    if object_name is None:
        object_name = os.path.basename(file)

    try:
        s3.upload_file(
            file,
            BUCKET_NAME,
            object_name,
            ExtraArgs={'ACL': 'public-read'}
        )
    except Exception as e:
        return {'errors': str(e)}

    return {'url': f'{S3_LOCATION}{file.filename}'}
