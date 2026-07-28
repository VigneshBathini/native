// Mini Challenge

// Given:

interface Course {
  id: number;
  title: string;
  price: number;
}

// Write the following state declarations:

// 1.

// A state for:
// Course object initially null
import {useState} from 'react';
const [course,setCourse]=useState<Course|null>(null)


// 2.A state for:
// Array of courses
const [courses,setCourses]= useState<Course[]>([])

// 3. A state for:
// Loading
const [loading,setLoading]=useState(false);

// 4. A state for:
// Search text
const [search,setSearch]=useState("")



const [selectedId, setSelectedId] = useState(0);//type number

const [error, setError] = useState<string | null>(null); //type string|null

const [isRefreshing, setIsRefreshing] = useState(false);//type boolean

