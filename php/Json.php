<?php

    class Json { //extends Model {

//        function Json() {
//            parent::Model();
//        }

        function encode($arr) {
            $str = '{';
            foreach($arr as $key => $value) {
                $str .= '"'.$key.'":"'.$value.'",';
            }

            $out = substr_replace($str, "", -1);
            $out .= '}';

            return $out;
        }

        function decode($str) {
            $arr = array('index' => array(), 'waarde' => array());
            $out = array();

            $str = str_replace('[', '', $str);
            $str = str_replace(']', '', $str);
            $str = str_replace('{', '', $str);
            $str = str_replace('}', '', $str);
            $str = str_replace('"', '', $str);


            $dirty = explode(',', $str);

            foreach($dirty as $set) {
                $pair = explode(':', $set);
                $out[$pair[0]] = $pair[1];
            }

            return $out;
        }

    }