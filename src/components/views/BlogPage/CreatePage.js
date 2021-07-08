import React, { useEffect, useState } from 'react'
import QuillEditor from '../../editor/QuillEditor';
import { Typography, Button, Form, message } from 'antd';
import axios from 'axios';


const { Title } = Typography;

function CreatePage(props) {

    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])
    const [blogs, setBlogs] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8080/blogs')
        .then(res => res.json())
        .then(data => setBlogs(data))
    },[])
    console.log(blogs)

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        setContent("");

        const variables = {
            content: content,
        }

        axios.post('http://localhost:8080/addBlogs', variables)
            .then(response => {
                if (response) {
                    message.success('Post Created!');

                    setTimeout(() => {
                    }, 2000);
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2} >Rich Editor by Rafee</Title>
            </div>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />

            <Form onSubmit={onSubmit}>
                <div style={{ textAlign: 'center', margin: '2rem', }}>
                    <Button
                        size="large"
                        htmlType="submit"
                        className=""
                        onSubmit={onSubmit}
                    >
                        Submit
                </Button>
                </div>
            </Form>
            <div>
                {
                    blogs.map(blog=><div  lg={8} md={12} xs={24}>
                        <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>
                    </div>)
                    
                }
            </div>
        </div>
    )
}

export default CreatePage
