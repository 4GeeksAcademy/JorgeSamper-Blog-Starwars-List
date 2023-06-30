import React, { useContext } from "react"
import { useParams } from "react-router"
import { Context } from "../store/appContext"

export const DetailView = ({ title, type }) => {
    const { id } = useParams()
    const { store, actions } = useContext(Context)
    const { detailCharacter } = store


    React.useEffect(() => {
        if (!id && !type) return

        actions.fetchDetailData(type, id)

    }, [])


    return <div style={{ margin: "1rem" }}>
        <h1>{title} {id}</h1>
        <section style={{ margin: "1rem" }}>
            {
                Object.keys(detailCharacter).map((key) => <p key={key}>{detailCharacter[key]}</p>)
            }
        </section>
    </div>
}