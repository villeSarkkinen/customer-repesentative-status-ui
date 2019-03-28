// @flow
export type DealType = {
    id: string,
    name: string,
    owner: string,
    amount: number,
    closeDate: string,
    workAmount: number,
    url: string,
    stage: string
}

export type LeadType = {
    id: string,
    name: string,
    owner: string,
    status: string,
    stage: string,
    company: string,
    url: string
}

export type MemberType = {
    id: string,
    name: string,
    role: string,
    leads: Array<LeadType>,
    deals: Array<DealType>
}

export type GroupType = {
    id: number,
    members: Array<MemberType>
}

export type DataType = {
    groups: Array<GroupType>
}
