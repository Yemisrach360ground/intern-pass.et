# intern-pass.et
Backend for pass.et - internship program



#testing the get functionality 

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/exam


#testing the get functionality using an id 

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/exam/1001





#testing the post functionality 




curl -X POST --data "title=newTitle&question=newquestion&answer=newanswer&level=1&subjction&timeout=60&explanation=newexplanation&trial=0" http://localhost:3000/exam


#testing the put functionality



curl -X PUT --data "title=newTitle&question=newquestion&answer=newanswer&level=1&subjction&timeout=60&explanation=newexplanation&trial=0" http://localhost:3000/exams/1001




#this one is not working correctly 


curl -X "DELETE" http://localhost:3000/exam/1001

