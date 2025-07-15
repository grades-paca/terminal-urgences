import {render} from "@testing-library/react";
import {DefaultLayout} from "@templates/DefaultLayout.tsx";
import {MemoryRouter} from "react-router";

export const simpleRender = () => {
    render(
        <MemoryRouter>
            <DefaultLayout>
                <div>Test Content </div>
            </DefaultLayout>
        </MemoryRouter>
    )
}
