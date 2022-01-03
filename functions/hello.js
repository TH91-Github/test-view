exports.handler = async function (event, context){
  return {
    statusCode:200, // 정상적인 응답
    body: JSON.stringify({
      name: 'HEROPY',
      age: 85,
      email:'thesecon@gmail.com'
    })
  }
}