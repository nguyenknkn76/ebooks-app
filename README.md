# B20DCVT276_NguyenTDK
## Title: `Development of a Smart Reading System with Personalized Voice Synthesis`
## Member: 
**Tran Dinh Khoi Nguyen**
- Id: B20DCVT276
- Name: Tran Dinh Khoi Nguyen
- Phone: 0981757692
- Email: 
  - nguyenknkn76@gmail.com
  - nguyentdk.b20vt276@stu.ptit.edu.vn

## Description: 
- Main content:
  - Objective: To develop an online reading platform capable of synthesizing personalized voice outputs tailored to individual user preferences.
  - Solution: 
     - Microservices-based Architecture: Employing a microservices architecture to enhance system modularity and scalability.
     - Voice Recommendation System: Implementing a recommendation system that leverages user reading history, ratings, and book content to suggest optimal voice outputs.
     - Intuitive User Interface: Designing a user-friendly interface that facilitates customization of voice settings.
- Pre database:
  - [GGC Text To Speech Document](https://cloud.google.com/text-to-speech/docs/basics) 
  - [Recommendation Algorithm ](https://phamdinhkhanh.github.io/2019/11/04/Recommendation_Compound_Part1.html#21-content-based-filtering)
  - [SAGA Design Pattern](https://microservices.io/patterns/data/saga.html#example-orchestration-based-saga) 

## Tech Stack:
- Frontend: Reactjs, TailwindCSS
- Backend: Nodejs, Expressjs, Django
- Database: MongoDB, PostgreSQL, S3
- Architect: Microservice - saga design pattern
- Cloud platform: Render, AWS
- Another tools:
  - CI/CD: Git
  - Containerize: Docker, Kubernetes
  - Voice API: GGC Text to speech
  - Message Broker: Kafka

## AWS S3 
### config
- create bucket in aws s3 console (naming bucket, choose region, set access modify)
- create IAM user and role (`AmazonS3FullAccess`) to get acess key and private key
- `.env`: 
```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=your_region
```

### CORS
- config CORS lience in s3 bucket permissions 
```.json
[
    {
        "AllowedOrigins": ["*"],
        "AllowedMethods": ["GET", "POST", "PUT"],
        "AllowedHeaders": ["*"],
        "MaxAgeSeconds": 3000
    }
]
```

## GGC 
### config
- create ggc project
- active API in APIs Services Library: enable Text To Speech
- create service account in Create Credentials (name, des, role `Editor`,`Admin`,`Owner`)
- create new key and save that file to project

## Conclusion

## Thesis document
Thesis docs (final)