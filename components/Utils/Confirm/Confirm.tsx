"use client"

import { Confirm as ConfirmSU } from "semantic-ui-react"

export function Confirm({...rest}) {
    return <ConfirmSU className="confirm" size="mini" {...rest} />;
}
