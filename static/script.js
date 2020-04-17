console.log('hellohellohellohellohellohellohellohello')

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content was Loaded')
    document.getElementById('delete-form').addEventListener('submit', (e) => {
        console.log('You clicked delete!')
        if (confirm('Are you suuuuuuuure?')) {
            return true
        }
        else {
            e.preventDefault()
            return false
        }
    })
})