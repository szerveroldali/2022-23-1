@extends('errors::minimal')

@section('title', $exception->getMessage())
@section('code', $exception->getStatusCode())
@section('message', $exception->getMessage())
