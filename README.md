# B20DCVT276_NguyenTDK
## Title: `Development of a Smart Reading System with Personalized Voice Systhesis`
## Member: 
   1. **Tran Dinh Khoi Nguyen**
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

## Plan:
| id  | Task                                                        | Time  | Note |
| --- | ----------------------------------------------------------- | ----- | ---- |
| 1   | Setup for User Service (Nodejs, Postgresql)                 | 10/10 | Done |
| 2   | Implement User Service                                      | 14/10 |      |
| 3   | Setup for Voice Service (GGC Text to Speech, Nodejs, Kafka) | 16/10 |      |
| 4   | Implement Voice Service                                     | 18/10 |      |
| 5   | Setup for Book Service (S3, Nodejs, Kafka)                  | 20/10 |      |
| 6   | Implement Book Service                                      | 24/10 |      |
| 7   | Research on recommendation algorithm                        | 25/10 |      |
| 8   | Setup Recommendation Service (Django)                       | 27/10 |      |
| 9   | Implement Recommendation Service                            | 31/10 |      |
| 10  | Setup for frontend (React, Tailwind)                        | 2/11  |      |
| 11  | Implement frontend                                          | 7/11  |      |
| 12  | Research on docker, kurbernets and deploy to cloud          | 10/11 |      |
| 13  | Write thesis docs                                           | 15/11 |      |

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

## Thesis Document: 
- [Thesis Doc (final)](https://docs.google.com/document/d/1opoLsSC_SwpOqWR8AslXZh6K99DoMr3nuLd0r3eXtgA/edit?tab=t.0) 
- [Thesis Doc (draf)](https://docs.google.com/document/d/1DuazX92NgvB11O3FIkxc2ol9s-iIii1CZMVYu_oeLVg/edit?tab=t.0)

try new update