import React, { useContext } from "react"
import { useParams } from "react-router"
import { Context } from "../store/appContext"

export const Planet = () => {
    const { id } = useParams()
    const { store, actions } = useContext(Context)
    const { detailPlanet } = store


    React.useEffect(() => {
        if (!id) return

        actions.fetchPlanetData(id)

    }, [])


    return <div style={{ margin: "1rem" }}>
        <h1>Planet {id}</h1>
        <section style={{ margin: "1rem" }}>
            {
                Object.keys(detailPlanet).map((key) => <p key={key}>{detailPlanet[key]}</p>)
            }
        </section>
    </div>
}