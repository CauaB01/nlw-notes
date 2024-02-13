import { ChangeEvent, useState } from 'react'
import logo from './assets/Logo.svg'
import { NewNoteCard } from './components/new-note-card'
import { Notecard } from './components/note-card'


interface Note {
    id: string
    date: Date
    content: string
}


// tem como colocar essa nota ja dentro do notecard porém fica mt codigo e referenciar com uma variavel assim ficar mais facil


export function App() {
    const [search, setSearch] = useState('')
    const [notes, setNotes] = useState<Note[]> (() =>{
        const notesOnStorage = localStorage.getItem('notes')

        if(notesOnStorage) {
            return JSON.parse(notesOnStorage)
        }

        return []
    })

function onNoteCreated(content:string){
    const newNote = {
        id: crypto.randomUUID(),
        date: new Date(),
        content,
    }

    const notesArray = [newNote ,...notes]


    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
    // local storage nn aceita um array(notes) por isso usa json para converter o array para um texto

}

function onNoteDelete(id:string) {
    const notesArray = notes.filter(note => {
        return note.id !== id
    })

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
}


    function handleSearch(event: ChangeEvent<HTMLInputElement>){
        const query = event.target.value

        setSearch(query)
    }
    
    const filteredNotes = search !== ''
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes
    

 return (
    // no tailwind numeros se multiplicam por 4 por exp my12 são 48px
    // essa div representa a pagina
<div className="mx-auto max-w-6xl my-12 space-y-6 px-5"> 
     <img src={logo} alt="nlw expert" className=' max-w-[80%]' />

        {/*esse form representa o busque suas notas */}
     <form className='w-full ' >
        <input 
        type="text" 
        placeholder='Busque em suas notas...' 
        className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500'
        onChange={handleSearch}
        />   
    </form>
     {/* essa div representa as notas em forma de GRID ou seja grade todas 3 na maximo depois vai para baixo */}
    <div className='h-px  bg bg-slate-700'/>
    
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'> 
    
    
    <NewNoteCard onNoteCreated={onNoteCreated} />
    
        {filteredNotes.map(note => {
            return <Notecard  key={note.id} note={note} onNoteDelete={onNoteDelete} />
        })}

    </div>

</div>
)

    
}

