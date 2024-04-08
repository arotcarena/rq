import { useFormik } from "formik";
import * as Yup from 'yup';


export type PostData = {
    userId: number,
    title: string,
    body: string,
    [key: string]: any
};

const defaultPost = {
    userId: 1,
    title: '',
    body: ''
};

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required')
});

type Props = {
    post?: PostData,
    onSubmit: (formData: PostData) => void
}

export const PostForm = ({
    post = defaultPost,
    onSubmit
}: Props) => {

    const validation = useFormik({
        initialValues: post,
        validationSchema,
        onSubmit,
      });

    return (
        <form onSubmit={validation.handleSubmit}>
            <div style={{margin: '10px 0'}}>
                <input
                    style={{height: '40px', width: '100%'}}
                    name="title"
                    type="text"
                    onChange={validation.handleChange}
                    value={validation.values.title}
                    placeholder="title"
                />
                {
                    validation.touched && validation.errors?.title && (
                        <div style={{color: 'red', fontSize: '.8em', marginTop: '4px'}}>{validation.errors.title}</div>
                    )
                }
            </div>
            <div style={{margin: '10px 0'}}>
                <textarea
                    style={{height: '100px', width: '100%'}}
                    name="body"
                    onChange={validation.handleChange}
                    value={validation.values.body}
                    placeholder="Body"
                />
                {
                    validation.touched && validation.errors?.body && (
                        <div style={{color: 'red', fontSize: '.8em', marginTop: '4px'}}>{validation.errors.body}</div>
                    )
                }
            </div>
            <div style={{margin: '10px 0'}}>
                <button type="submit">Valider</button>
            </div>
        </form>
    )
}