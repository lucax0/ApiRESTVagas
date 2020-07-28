# teste-api-restVagas

###### API REST NODEJS + MONGOOSE

Candidato = User ; Vagas = Job Role;

To run the project: 

-> NODEJS with NPM + Yarn

-> MongoDB running i'm using AtlasDB (Easy to configure)

-> On mongoDb JS change the credentials to Mongo.

Running the project: 

-> Run Yarn so it can get all depedencies. ( If you don't have yarn yet just run npm install yarn on your cmd)

-> Just open the powershell on the main folder and run yarn dev (Already have a script configured on the project)

===============================
 ###### JSON EXAMPLES FOR API CALLS
 
 => POST VAGAS /vagas:
 
    {"titulo" : "Rh",
    "descricao" : "Analista de RH",
    "data_limite" : "2020/08/01",
    "numero_vagas" : 1 }
    
=> GET VAGAS /vagas/ ou /vagas/+id:
   Without the ID the api return ALL the info from DB.
      
=> PUT VAGAS /vagas/+id:
 
    {"titulo" : "Rh",
    "descricao" : "Analista de RH",
    "data_limite" : "2020/08/01",
    "numero_vagas" : 1 }
    
=> DELETE VAGAS /vagas/+id.

=> POST CANDIDATOS /candidatos
   {"cpf" : "00000000000",
    "nome" : "TESTE",
    "email" : "TESTE@gmail",
    "senha" : "1589841652111" }
 
=> PUT/DELETE CANDIDATOS Follow the same pattern as Vagas.
    
=> POST CANDIDATOS NAS VAGAS   vagas/addcandidato/+idcandidato:

  {
  "vagas" : ["b1c90376-4394-4150-803a-67892e3199b5" , "fba4b135-5edd-4923-9f1c-e820da513f40"] 
  }
  
  CANDIDATO can join in more than one : "vaga" so we send all the "vagas"via array
  
