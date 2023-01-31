import uuid
from boto3 import Session
from boto3 import resource
    
def lambda_handler(event, context):
    # Retrieves three input parameters:
    # voice – one of dozens of voices that are supported by Amazon Polly
    # text – the text of the post that we want to convert into an audio file
    # speed - the speaking rate of the converted audio file
    voice = event["voice"]
    text = event["text"]
    speed = event["speed"]
    
    # Setup a session with a region
    session = Session(region_name="us-west-2")
    
    # Create a polly client
    polly = session.client("polly")
    # Create a s3 resource reference
    s3 = resource('s3')
    
    # Reference to our s3 bucket
    bucket_name = "mimid-polly-bucket"
    bucket = s3.Bucket(bucket_name)
    # Create a unique filename for our audiofile to reliably reference
    filename = str(uuid.uuid4()) + ".mp3"
    # Format our text to a ssml, wrapping with a prosody tag and associated speed
    ssmlText = f'<prosody rate="{speed}">{text}</prosody>'
    
    # Submit to polly our speach to be synthesized
    response = polly.synthesize_speech(
    Engine='neural',
    Text=ssmlText,
    OutputFormat="mp3",
    TextType='ssml',
    VoiceId=voice)
    
    # Response back from polly to be converted to an audiostream
    stream = response["AudioStream"]
    
    # Push out audio stream polly audio into our s3 bucket
    bucket.put_object(Key=filename, ContentType='audio/mpeg', Body=stream.read(), ACL='public-read')
    
    # Generate a json object to be returned as a response with reference to
    # our audio file
    returnJson = {"s3url": "https://" + bucket_name + ".s3.amazonaws.com/" + filename}
    
    return returnJson