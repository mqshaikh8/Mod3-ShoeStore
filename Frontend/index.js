// Code your solution here
document.addEventListener("DOMContentLoaded",e => {
   const showBar = document.querySelector("#shoe-list")


   const ParentDiv = document.querySelector("#main-shoe")
   const img = document.querySelector("#shoe-image")
   const supportDiv = document.querySelector(".card-body")
   const header = document.querySelector("#shoe-name")
   const descriptiveP = document.querySelector("#shoe-description")
   const priceP = document.querySelector("#shoe-price")
   const reviewList = document.querySelector("#reviews-list")
   const newReviewForm = document.querySelector("#form-container")
   
   const form = document.createElement("form")
    form.id = "new-review"

    const helperDiv = document.createElement("div")
        helperDiv.className = "form-group"

    const reviewInput= document.createElement("textarea")
        reviewInput.className = "form-control"
        reviewInput.id = "review-content"

    const submitBttn = document.createElement("button")
    submitBttn.type = "submit"
    submitBttn.innerText = "Review"
    submitBttn.className = "btn btn-primary"

    helperDiv.append(reviewInput,submitBttn)
    form.append(helperDiv,reviewInput,submitBttn)
    newReviewForm.append(form)
   
   

   fetch('http://localhost:3000/shoes')
   .then(r => r.json())
   .then(obj =>{
       
       obj.forEach(element => {
        turnJSONintoHtml(element)
        
       });
       
   })


    function turnJSONintoHtml(element){
        const nameLi = document.createElement("li")
        nameLi.className = "list-group-item"
        nameLi.innerText = element.name
        showBar.append(nameLi)
        nameLi.addEventListener("click",e => {
            img.src = element.image
            header.innerText = element.name
            descriptiveP.innerText = element.description
            priceP.innerText = element.price    
            const newLi = document.createElement("li")
            // console.log(element.reviews[0])
            newLi.className = "list-group-item"
            newLi.innerText = element.reviews[0].content
            reviewList.append(newLi)


            newReviewForm.addEventListener("submit", e => {
                e.preventDefault()
                const formValue = {content: e.target["review-content"].value}
                element.reviews.push(formValue)
                // console.log(element.reviews)
                fetch(`http://localhost:3000/shoes/${element.id}/reviews`,{
                    method: "POST",
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    
                    body :JSON.stringify({
                        
                        content: element.reviews
                        
                    })
                    
                })
                .then(r => r.json())
                .then(console.log)
                   
                   })
           
        })
    }
})