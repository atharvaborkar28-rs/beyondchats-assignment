<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::all();
    }

    public function latest()
    {
        return Article::orderBy('created_at', 'desc')->limit(5)->get();
    }
}
