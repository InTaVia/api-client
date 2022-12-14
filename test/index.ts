import { test } from 'uvu'
import * as assert from 'uvu/assert'

import {
  birthStatisticsSearchResponse,
  birthStatisticsSearchSearchParams,
  configureApiBaseUrl,
  deathStatisticsSearchResponse,
  deathStatisticsSearchSearchParams,
  getEntityById,
  getEntityByIdResponse,
  getEntityEventById,
  getEntityEventByIdResponse,
  occupationsStatisticsSearchResponse,
  occupationsStatisticsSearchSearchParams,
  searchBirthStatistics,
  searchDeathStatistics,
  searchEntities,
  searchEntitiesResponse,
  searchEntitiesSearchParams,
  searchOccupations,
  searchOccupationsResponse,
  searchOccupationsSearchParams,
  searchOccupationStatistics,
} from '../src/index.js'

const baseUrl = 'https://intavia-backend.acdh-dev.oeaw.ac.at'

test.before(() => {
  configureApiBaseUrl(baseUrl)
})

test('searchEntities search params match validation schema', async () => {
  const searchParams = await searchEntities.searchParams({})
  assert.ok(searchEntitiesSearchParams.safeParse(searchParams).success)
})

test('searchEntities response matches validation schema', async () => {
  const response = await searchEntities.request({})
  assert.ok(searchEntitiesResponse.safeParse(response).success)
})

test('getEntityById response matches validation schema', async () => {
  const response = await getEntityById.request({
    id: 'http://www.intavia.eu/apis/personproxy/70682',
  })
  assert.ok(getEntityByIdResponse.safeParse(response).success)
})

test('getEntityEventById response matches validation schema', async () => {
  const response = await getEntityEventById.request({
    id: 'http://www.intavia.eu/apis/birthevent/70682',
  })
  assert.ok(getEntityEventByIdResponse.safeParse(response).success)
})

test('searchOccupations search params match validation schema', async () => {
  const searchParams = await searchOccupations.searchParams({})
  assert.ok(searchOccupationsSearchParams.safeParse(searchParams).success)
})

test('searchOccupations response matches validation schema', async () => {
  const response = await searchOccupations.request({})
  assert.ok(searchOccupationsResponse.safeParse(response).success)
})

test('searchOccupationStatistics search params match validation schema', async () => {
  const searchParams = await searchOccupationStatistics.searchParams({})
  assert.ok(occupationsStatisticsSearchSearchParams.safeParse(searchParams).success)
})

test('searchOccupationStatistics response matches validation schema', async () => {
  const response = await searchOccupationStatistics.request({})
  assert.ok(occupationsStatisticsSearchResponse.safeParse(response).success)
})

test('searchBirthStatistics search params match validation schema', async () => {
  const searchParams = await searchBirthStatistics.searchParams({})
  assert.ok(birthStatisticsSearchSearchParams.safeParse(searchParams).success)
})

test('searchBirthStatistics response matches validation schema', async () => {
  const response = await searchBirthStatistics.request({})
  assert.ok(birthStatisticsSearchResponse.safeParse(response).success)
})

test('searchDeathStatistics search params match validation schema', async () => {
  const searchParams = await searchDeathStatistics.searchParams({})
  assert.ok(deathStatisticsSearchSearchParams.safeParse(searchParams).success)
})

test('searchDeathStatistics response matches validation schema', async () => {
  const response = await searchDeathStatistics.request({})
  assert.ok(deathStatisticsSearchResponse.safeParse(response).success)
})

test.run()
